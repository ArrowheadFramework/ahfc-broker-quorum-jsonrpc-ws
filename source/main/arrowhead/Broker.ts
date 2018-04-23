import * as rpc from "./rpc";
import * as util from "../util";

/**
 * Serves the Arrowhead _Broker_ services.
 */
export class Broker {
    private readonly logger: util.Logger;
    private readonly server: rpc.Server;
    private readonly router: rpc.Router;

    /**
     * Creates new server instance, without starting it.
     */
    public constructor(logger: util.Logger) {
        this.logger = logger;

        this.server = new rpc.json.Server();
        this.server.addListener("error", (error: Error) => {
            this.logger.warn(`<${this.server.id}> error:\n%o`, error);
        });

        this.router = new rpc.Router(this.logger);
        this.router.addServer(this.server);
        this.router.addMethod("echo", async (message) => {
            return message;
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