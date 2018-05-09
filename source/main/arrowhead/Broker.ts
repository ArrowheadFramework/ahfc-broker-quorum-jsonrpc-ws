import * as impl from "./impl";
import * as log from "../util/log";
import * as rpc from "../util/rpc";
import * as spec from "./spec";

/**
 * Serves the Arrowhead _Broker_ services.
 */
export class Broker {
    private readonly logger: log.Logger;
    private readonly server: rpc.Server;
    private readonly router: rpc.Router;

    /**
     * Creates new server instance, without starting it.
     */
    public constructor(logger: log.Logger) {
        this.logger = logger;

        this.server = new rpc.json.Server();
        this.server.addListener("error", (error: Error) => {
            this.logger.warn(`<${this.server.id}> error:\n%o`, error);
        });

        this.router = new rpc.Router(this.logger);
        this.router.addServer(this.server);
        {
            const service = new impl.BrokerAccounting();
            this.router.addMethod("BrokerAccounting.getExchanges", (query) => {
                return service.getExchanges(query);
            });
            this.router.addMethod("BrokerAccounting.getParties", (query) => {
                return service.getParties(query);
            });
        }
        {
            const service = new impl.Brokering();
            this.router.addMethod("Brokering.propose", (receivers, proposal) => {
                return service.propose(receivers, proposal);
            });
            this.router.addMethod("Brokering.accept", (id, deadline) => {
                return service.accept(id, deadline);
            });
            this.router.addMethod("Brokering.reject", (id) => {
                return service.reject(id);
            });
            this.router.addMethod("Brokering.confirm", (id, acceptor) => {
                return service.confirm(id, acceptor);
            });
            this.router.addMethod("Brokering.abort", (id, acceptor) => {
                return service.abort(id, acceptor);
            });
        }
        {
            const service = new impl.BrokerSession();
            this.router.addMethod("BrokeringSession.getAgentKey", () => {
                return service.getAgentKey();
            });
            this.router.addMethod("BrokeringSession.getCallback", () => {
                return service.getCallback();
            });
            this.router.addMethod("BrokeringSession.getProposalFilter", () => {
                return service.getProposalFilter();
            });
            this.router.addMethod("BrokeringSession.setCallback", (callback) => {
                return service.setCallback(callback);
            });
            this.router.addMethod("BrokeringSession.setProposalFilter", (filter) => {
                return service.setProposalFilter(filter);
            });
        }
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