import * as events from "events";
import * as rpc from "../";
import { Socket } from ".";
import * as WebSocket from "ws";

/**
 * An JSON-RPC 2.0 server listening for Remote Procedure Calls (RPCs).
 */
export class Server extends events.EventEmitter implements rpc.Server {
    private static nextId = 1;

    private nextSocketId = 1;    
    private server: WebSocket.Server;

    public readonly id: string;

    /**
     * Creates new JSON-RPC 2.0 server.
     */
    public constructor() {
        super();
        this.server = undefined;
        this.id = `jRPC-${Server.nextId++}`;
    }

    public listen(port: number): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.server !== undefined) {
                reject(new Error("Already listening for incoming connections"));
                return;
            }
            this.server = new WebSocket.Server({ port });
            this.server.addListener("connection", (client: WebSocket) => {
                const id = `${this.id}-${this.nextSocketId++}`;
                if (this.nextSocketId >= Number.MAX_SAFE_INTEGER) {
                    this.nextSocketId = 0;
                }
                const socket = new Socket(id, client);
                if (client.readyState === WebSocket.OPEN) {
                    this.emit("connection", socket);
                    return;                    
                }
                const onError = (error: Error) => {
                    this.emit("error", error);
                };
                const onOpen = () => {
                    client.removeListener("error", onError);
                    client.removeListener("open", onOpen);
                    this.emit("connection", socket);
                };
                client.addListener("error", onError);
                client.addListener("open", onOpen);
            });
            this.server.addListener("error", (error: Error) => {
                this.emit("error", error);
            });
            this.server.addListener("listening", () => {
                resolve();
            });
        });
    }

    public close(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.server === undefined) {
                reject(new Error("Not listening for incoming connections"));
                return;
            }
            this.server.close((error?: Error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
            this.server = undefined;
        });
    }
}