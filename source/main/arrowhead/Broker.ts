import * as rpc from "./rpc";

/**
 * Serves the Arrowhead _Broker_ services.
 */
export class Broker {
    private readonly server: rpc.Server;

    /**
     * Creates new server instance, without starting it.
     */
    public constructor() {
        this.server = new rpc.json.Server();
        this.server.addListener("connection", (socket: rpc.Socket) => {
            console.log(`+ <${socket.id}> connected`);
            socket.addListener("call", (event: rpc.SocketCallEvent) => {
                console.log("CALL");
                console.log(event);
                if (event.respond) {
                    event.respond.return(event.params);
                }
            });
            socket.addListener("close", (event: rpc.SocketCloseEvent) => {
                console.log(`+ <${socket.id}> disconnected`);
            });
            socket.addListener("error", (error: Error) => {
                console.log(`- <${socket.id}> error:\n${error}`);
            });
        });
        this.server.addListener("error", (error: Error) => {
            console.log(`- <${this.server.id}> error:\n${error}`);
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
        console.log(`+ <${this.server.id}> started`);
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
        console.log(`+ <${this.server.id}> stopped`);
    }
}