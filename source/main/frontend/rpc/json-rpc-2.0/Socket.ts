import * as events from "events";
import * as rpc from "../";
import * as WebSocket from "ws";

const CODE_USER_ERROR = 0;
const CODE_PARSE_ERROR = -32700;
const CODE_INVALID_REQUEST = -32600;
const CODE_METHOD_NOT_FOUND = -32601;
const CODE_INVALID_PARAMS = -32602;
const CODE_INTERNAL_ERROR = -32603;

/**
 * A socket through which JSON-RPC 2.0 calls can be sent and received.
 *
 * # Limitations
 *
 * - Does not support JSON-RPC 2.0 batch requests.
 */
export class Socket extends events.EventEmitter implements rpc.Socket {
    private static nextRequestId = Math.random() * 65535;

    private readonly calls: Map<number, CallPromise>;
    private socket: WebSocket;

    public readonly id: string;

    /**
     * Creates new JSON-RPC 2.0 socket.
     * 
     * @param id Unique `Socket` instance identifier.
     * @param socket WebSocket transport.
     */
    public constructor(id: string, socket: WebSocket) {
        super();
        this.calls = new Map();
        this.socket = socket;
        this.socket.addListener("close", (code, message) => {
            this.emit("close", {
                wasClean: true,
                reason: `[${code}] ${message}`,
            });
        });
        this.socket.addListener("error", (error: Error) => {
            this.emit("error", error);
        });
        this.socket.addListener("message", (data: WebSocket.Data) => {
            let text: string;
            let message: any;

            // Decode message.
            try {
                if (data instanceof Buffer) {
                    text = data.toString();

                } else if (data instanceof ArrayBuffer) {
                    text = new TextDecoder("utf-8").decode(data);

                } else if (Array.isArray(data)) {
                    text = "";
                    for (const d of data) {
                        text += d.toString();
                    }
                } else {
                    text = data.trim();
                }
                message = JSON.parse(text);

            } catch (error) {
                this.emit("error", new Error(`${error.message}\n${data}`));
                this.throw(null, CODE_PARSE_ERROR, "Invalid JSON");
                return;
            }

            // Validate message.
            if (isArray(message)) {
                this.emit("error", new Error(
                    `JSON-RPC 2.0 request batches not supported:\n${text}`
                ));
                this.throw(null, CODE_INTERNAL_ERROR, `Batching not supported`);
                return;
            }
            if (!isObject(message)) {
                this.emit("error", new Error(
                    `Message not an object:\n${text}`
                ));
                this.throw(null, CODE_INVALID_REQUEST, `Message not an object`);
                return;
            }
            let id = message["id"];
            if (id === undefined) {
                id = null;

            } else if (typeof id === "object") {
                this.emit("error", new Error(
                    `Bad message "id":\n${text}`
                ));
                this.throw(id, CODE_INVALID_REQUEST, `"id" must be a number`);
                return;
            }
            if (!isMessage(message)) {
                this.emit("error", new Error(
                    `Not a JSON-RPC 2.0 message:\n${text}`
                ));
                this.throw(id, CODE_INVALID_REQUEST, `"jsonrpc" must be "2.0"`);
                return;
            }

            // Handle if request.
            if (isRequest(message)) {
                if (typeof message.method !== "string") {
                    this.emit("error", new Error(
                        `No method name in message:\n${text}`
                    ));
                    this.throw(id, CODE_INVALID_REQUEST,
                        `"method" must be string`);
                    return;
                }
                let respond = undefined;
                if (id !== null) {
                    respond = {
                        return: (result: any) => this.return(id, result),
                        throw: (error: Error) => {
                            let code;
                            if (error instanceof ReferenceError) {
                                code = CODE_METHOD_NOT_FOUND;
                            } else if (error instanceof TypeError) {
                                code = CODE_INVALID_PARAMS;
                            } else {
                                code = CODE_USER_ERROR;
                            }
                            this.throw(id, code, error.message)
                        },
                    };
                }
                this.emit("call", {
                    method: message["method"],
                    params: message["params"] || [],
                    respond,
                });
                return;
            }

            // Handle if response.
            if (isResponse(message)) {
                let call = this.calls.get(message.id);
                if (!call) {
                    this.emit("error", new Error(
                        `Unexpected JSON-RPC 2.0 response:\n${text}`
                    ));
                    return;
                }
                if (message.result) {
                    call.resolve(message.result);

                } else if (message.error) {
                    let msg = `[${message.error.code}] ${message.error.message}`;
                    if (message.error.data) {
                        msg += "\n" + message.error.data;
                    }
                    call.reject(new Error(msg));
                }
            }

            // Emit error if nothing was handled.
            this.emit("error", new Error(
                `Invalid JSON-RPC 2.0 object:\n${text}`
            ));
            this.throw(id, CODE_INVALID_REQUEST, "Not a request or response");
        });
        this.id = id;
    }

    private return(id: number, result: any): Promise<void> {
        return new Promise((resolve, reject) => {
            this.socket.send(
                JSON.stringify({ jsonrpc: "2.0", result, id } as Response),
                (error?: Error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                }
            );
        });
    }

    private throw(id, code: number, message: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.socket.send(
                JSON.stringify({
                    jsonrpc: "2.0",
                    error: { code, message },
                    id,
                } as Response),
                (error?: Error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                }
            );
        });
    }

    public call(method: string, ...params: any[]): Promise<any> {
        const id = Socket.nextRequestId;
        Socket.nextRequestId += 1;
        if (Socket.nextRequestId >= Number.MAX_SAFE_INTEGER) {
            Socket.nextRequestId = 0;
        }
        return new Promise((resolve, reject) => {
            this.socket.send(
                JSON.stringify({
                    jsonrpc: "2.0",
                    method,
                    params,
                    id
                } as Request),
                (error?: Error) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    const timeout = setTimeout(() => {
                        if (this.calls.delete(id)) {
                            reject(new Error("Response timeout"));
                        }
                    }, 5000); // TODO: Make configurable.
                    this.calls.set(id, {
                        resolve: (result?: any) => {
                            if (this.calls.delete(id)) {
                                clearTimeout(timeout);
                                resolve(result);
                            } else {
                                reject(new Error("No such request"));
                            }
                        },
                        reject: (error: Error) => {
                            if (this.calls.delete(id)) {
                                clearTimeout(timeout);
                                reject(error);
                            } else {
                                reject(new Error("No such request"));
                            }
                        }
                    });
                }
            );
        });
    }

    public close(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.socket === undefined) {
                reject(new Error("Already closed"));
                return;
            }
            const socket = this.socket;
            socket.addListener("close", () => {
                resolve();
            });
            socket.close();
            this.socket = undefined;
        });
    }
}

interface CallPromise {
    resolve: (result?: any) => void;
    reject: (error: Error) => void;
}

type Message = Request | Response;

interface Request {
    jsonrpc: "2.0";
    method: string;
    params?: any[];
    id?: number;
}

interface Response {
    jsonrpc: "2.0";
    result?: any;
    error?: {
        code: number;
        message: string;
        data?: any;
    };
    id?: number;
}

function isArray(data: any): data is any[] {
    return Array.isArray(data);
}

function isObject(data: any): data is object {
    return typeof data === "object";
}

function isMessage(data: object): data is Message {
    return data["jsonrpc"] === "2.0";
}

function isRequest(message: Message): message is Request {
    return (<Request>message).method !== undefined
        || Array.isArray((<Request>message).params);
}

function isResponse(message: Message): message is Response {
    return (<Response>message).result !== undefined
        || (<Response>message).error !== undefined;
}