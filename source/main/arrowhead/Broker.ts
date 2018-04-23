import * as rpc from "./rpc";
import * as util from "../util";

/**
 * Serves the Arrowhead _Broker_ services.
 */
export class Broker {
    private readonly logger: util.Logger;
    private readonly server: rpc.Server;

    /**
     * Creates new server instance, without starting it.
     */
    public constructor(logger: util.Logger) {
        this.logger = logger;
        this.server = new rpc.json.Server();
        this.server.addListener("connection", (socket: rpc.Socket) => {
            this.logger.info(`<${socket.id}> connected.`);
            socket.addListener("call", (event: rpc.SocketCallEvent) => {
                if (event.respond) {
                    event.respond.return(event.params);
                }
            });
            socket.addListener("close", (event: rpc.SocketCloseEvent) => {
                this.logger.info(`<${socket.id}> disconnected.`);
            });
            socket.addListener("error", (error: Error) => {
                this.logger.warn(`<${socket.id}> error:\n%o`, error);
            });
        });
        this.server.addListener("error", (error: Error) => {
            this.logger.warn(`<${this.server.id}> error:\n%o`, error);
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
        this.logger.info(`<${this.server.id}> started.`);
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
        this.logger.info(`<${this.server.id}> stopped.`);
    }
}