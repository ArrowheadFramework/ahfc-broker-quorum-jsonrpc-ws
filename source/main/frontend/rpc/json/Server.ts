import * as events from "events";
import * as rpc from "../";
import { Socket } from ".";
import * as WebSocket from "ws";

/**
 * An JSON-RPC 2.0 server listening for Remote Procedure Calls (RPCs).
 */
export class Server extends events.EventEmitter implements rpc.Server {
    private server: WebSocket.Server;

    /**
     * Creates new JSON-RPC 2.0 server.
     */
    public constructor() {
        super();
        this.server = undefined;
    }

    public listen(port: number): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.server !== undefined) {
                reject(new Error("Already listening for incoming connections"));
                return;
            }
            this.server = new WebSocket.Server({ port });
            this.server.addListener("connection", (client: WebSocket) => {
                const onError = (error: Error) => {
                    this.emit("error", error);
                };
                const onOpen = () => {
                    client.removeListener("error", onError);
                    client.removeListener("open", onOpen);
                    this.emit("connection", new Socket(client));
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