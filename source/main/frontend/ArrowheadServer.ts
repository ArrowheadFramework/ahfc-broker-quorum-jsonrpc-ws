import * as rpc from "./rpc";

/**
 * Serves the Arrowhead _Broker_ services.
 */
export class ArrowheadServer {
    private readonly server: rpc.Server;

    /**
     * Creates new server instance, without starting it.
     */
    public constructor() {
        this.server = new rpc.json.Server();
        this.server.addListener("connection", (socket: rpc.Socket) => {
            socket.addListener("call", (event: rpc.SocketCallEvent) => {

            });
            socket.addListener("close", (event: rpc.SocketCloseEvent) => {

            });
            socket.addListener("error", (error: Error) => {

            });
        });
        this.server.addListener("error", (error: Error) => {

        });
    }

    /**
     * Starts server, making it start accepting incoming connections.
     *
     * # Asyncrohony
     *
     * If awaited, the function returns when the server is fully initialized.
     */
    public async start() {
        await this.server.listen(8080); // TODO: Make configurable.
    }

    /**
     * Stops server, making it stop accepting incoming connections.
     *
     * # Asynchrony
     *
     * If awaited, the function returns when any ongoing communications have
     * been gracefully terminated.
     */
    public async stop() {
        await this.server.close();
    }
}