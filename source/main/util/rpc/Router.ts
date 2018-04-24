import { Server, Socket, SocketCallEvent, SocketCloseEvent } from ".";
import { CodeError, codes } from "./CodeError";
import * as log from "../log";

/**
 * Routes RPC calls to registered functions.
 */
export class Router {
    private readonly listeners: Map<Server, (socket: Socket) => void>;
    private readonly logger: log.Logger;
    private readonly routes: Map<string, (...params: any[]) => Promise<any>>;

    /**
     * Creates new `Router`.
     * 
     * @param logger Logger used for logging significant routing events.
     */
    public constructor(logger: log.Logger) {
        this.listeners = new Map();
        this.logger = logger;
        this.routes = new Map();
    }

    /**
     * Adds RPC method to router.
     * 
     * @param name Name of added method.
     * @param impl Method implementation.
     */
    public addMethod(name: string, impl: (...params: any[]) => Promise<any>) {
        if (this.routes.has(name)) {
            throw new TypeError(`Method with name ${name} already added.`);
        }
        this.routes.set(name, impl);
    }

    /**
     * Adds server to router, causing its incoming `"call"` events to be routed.  
     * 
     * @param server Server to add.
     */
    public addServer(server: Server) {
        if (this.listeners.has(server)) {
            throw new TypeError(`Server with id ${server.id} already added.`);
        }
        const listener = (socket: Socket) => {
            this.logger.info(`<${socket.id}> connected.`);
            socket.addListener("call", (event: SocketCallEvent) => {
                const method = this.routes.get(event.method);
                if (method === undefined) {
                    this.logger.warn(
                        `<${socket.id}> called unkown method "${event.method}".`
                    );
                    if (event.respond) {
                        event.respond.throw(new CodeError(
                            codes.METHOD_NOT_FOUND,
                            `Method "${event.method}" does not exist.`
                        ));
                    }
                    return;
                }
                const handleError = (error) => {
                    // Only route CodeError instances to method caller.
                    if (!(error instanceof CodeError)) {
                        this.logger.error(
                            `<${socket.id}> "${event.method}" internal error:\n%o`,
                            error
                        );
                        error = new CodeError(
                            codes.INTERNAL_ERROR,
                            "Internal server error."
                        );
                    }
                    if (event.respond) {
                        event.respond.throw(error);
                        return;
                    }
                    this.logger.error(
                        `<${socket.id}> notify "${event.method}" error:\n%o`,
                        error
                    );
                };
                try {
                    method(...event.params).then(
                        result => {
                            if (event.respond) {
                                event.respond.return(result);
                            }
                        },
                        handleError
                    );
                } catch (error) {
                    handleError(error);
                }
            });
            socket.addListener("close", (event: SocketCloseEvent) => {
                this.logger.info(`<${socket.id}> disconnected.`);
            });
            socket.addListener("error", (error: Error) => {
                this.logger.warn(`<${socket.id}> error:\n%o`, error);
            });
        };
        this.listeners.set(server, listener);
        server.addListener("connection", listener);
    }

    /**
     * Attempts to remove named method.
     *
     * @param method Name of removed method.
     * @returns Whether or not given `method` was removed.
     */
    public removeMethod(method: string): boolean {
        return this.routes.delete(method);
    }

    /**
     * Attempts to remove a previously added `Server` from `Router`.
     *
     * @param server Server to remove from router.
     * @returns Whether or not given `server` was removed.
     */
    public removeServer(server: Server): boolean {
        const listener = this.listeners.get(server);        
        if (listener !== undefined) {
            this.listeners.delete(server);
            server.removeListener("connection", listener);
            return true;
        }
        return false;
    }
}