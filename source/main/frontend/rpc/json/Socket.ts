import * as events from "events";
import * as rpc from "../";
import * as WebSocket from "ws";
import { AssertionError } from "assert";

/**
 * A socket through which JSON-RPC 2.0 calls can be sent and received.
 */
export class Socket extends events.EventEmitter implements rpc.Socket {
    private static nextId = Math.random() * 65535;
    private readonly inbounds: Map<number, CallPromise>;
    private socket: WebSocket;

    /**
     * Creates new JSON-RPC 2.0 socket.
     * 
     * @param socket WebSocket transport.
     */
    public constructor(socket: WebSocket) {
        super();
        this.inbounds = new Map();
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
            let string: string;
            let message: object;

            // Encode message.
            try {
                if (data instanceof Buffer) {
                    string = data.toString();
                }
                if (data instanceof ArrayBuffer) {
                    string = new TextDecoder("utf-8").decode(data);
                }
                if (Array.isArray(data)) {
                    string = "";
                    for (const d of data) {
                        string += d.toString();
                    }
                }
                message = JSON.parse(string);
            } catch (error) {
                this.emit("error", new Error(`Not JSON encoded:\n${string}`));
                this.throw(null, -32700, "Invalid JSON");
                return;
            }

            let id = message["id"];
            if (id === undefined) {
                id = null;
            }

             // Validate message.
            if (typeof id === "object") {
                this.emit("error", new Error(
                    `Bad message "id":\n${string}`
                ));
                this.throw(id, -32603, `Field "id" must contain a number`);
            }
            if (message["jsonrpc"] !== "2.0") {
                this.emit("error", new Error(
                    `Not a JSON-RPC 2.0 message:\n${string}`
                ));
                this.throw(id, -32603, `Field "jsonrpc" must be "2.0"`);
                return;
            }
            // TODO: Handle responses.
            if (!message["method"]) {
                this.emit("error", new ReferenceError(
                    `No method name in message:\n${string}`
                ));
                this.throw(id, -32600, "No method name in message");
                return;
            }

            // Prepare response functions.
            let respond = undefined;
            if (message["id"]) {
                respond = {
                    return: (result: any) => this.return(id, result),
                    throw: (error: Error) => {
                        let code;
                        if (error instanceof ReferenceError) {
                            code = -32601;
                        } else if (error instanceof TypeError) {
                            code = -32602;
                        } else {
                            code = 400;
                        }
                        this.throw(id, code, error.message)
                    },
                };
            }

            // Emit event.
            this.emit("call", {
                method: message["method"],
                params: message["params"] || [],
                respond,
            });
        });
    }

    private return(id: number, result: any): Promise<void> {
        return new Promise((resolve, reject) => {
            this.socket.send(
                JSON.stringify({ jsonrpc: "2.0", result, id }),
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
                }),
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
        const id = Socket.nextId;
        Socket.nextId += 1;
        if (Socket.nextId >= Number.MAX_SAFE_INTEGER) {
            Socket.nextId = 0;
        }
        return new Promise((resolve, reject) => {
            this.socket.send(
                JSON.stringify({ jsonrpc: "2.0", method, params, id }),
                (error?: Error) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    const timeout = setTimeout(() => {
                        if (this.inbounds.delete(id)) {
                            reject(new Error("Response timeout"));
                        }
                    }, 5000); // TODO: Make configurable.
                    this.inbounds.set(id, {
                        resolve: (result?: any) => {
                            if (this.inbounds.delete(id)) {
                                clearTimeout(timeout);
                                resolve(result);
                            } else {
                                reject(new Error("No such request"));
                            }
                        },
                        reject: (error: Error) => {
                            if (this.inbounds.delete(id)) {
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