import { CodeError } from ".";
import * as events from 'events';

/**
 * A socket through which remote procedure calls can be sent and received.
 */
export interface Socket extends events.EventEmitter {
    /**
     * Unique socket instance identifier.
     */
    readonly id: string;

    /**
     * Registers `"call"` event listener.
     *
     * @param event `"call"`
     * @param listener Callback executed when a `"call"` event is raised.
     */
    addListener(event: "call", listener: (event: SocketCallEvent) => void);

    /**
     * Registers `"close"` event listener.
     *
     * @param event `"close"`
     * @param listener Callback executed when a `"close"` event is raised.
     */
    addListener(event: "close", listener: (event: SocketCloseEvent) => void);

    /**
     * Registers `"error"` event listener.
     *
     * @param event `"error"`
     * @param listener Callback executed when a `"error"` event is raised.
     */
    addListener(event: "error", listener: (error: Error) => void);

    /**
     * Deregisters `"call"` event listener.
     * 
     * @param event `"call"`
     * @param listener Callback to no longer be executed when `"call"` events
     *                 are raised.
     */
    removeListener(event: "call", listener: (event: SocketCallEvent) => void);

    /**
     * Deregisters `"close"` event listener.
     * 
     * @param event `"close"`
     * @param listener Callback to no longer be executed when `"close"` events
     *                 are raised.
     */
    removeListener(event: "close", listener: (event: SocketCloseEvent) => void);

    /**
     * Deregisters `"error"` event listener.
     * 
     * @param event `"error"`
     * @param listener Callback to no longer be executed when `"error"` events
     *                 are raised.
     */
    removeListener(event: "error", listener: (error: Error) => void);

    /**
     * Submits invocation request of named procedure with provided arguments.
     *
     * @param name Name of remote procedure to call.
     * @param args Any provided arguments.
     * @returns Promise of call return value.
     */
    call(name: string, ...args: any[]): Promise<any>;

    /**
     * Closes socket.
     *
     * # Silent
     * 
     * Calling this function does not cause a `"close"` event to be raised.
     *
     * @returns Promise of close completion.
     */
    close(): Promise<void>;
}

/**
 * Event raised in the event of a `Socket` receiving a remote procedure call.
 */
export interface SocketCallEvent {
    /**
     * Name of called procedure.
     */
    method: string;

    /**
     * Procedure arguments.
     */
    params: any[];

    /**
     * Function for responding to incoming procedure call.
     *
     * If the received message is a notification, this property is not
     * provided. If provided, however, exactly one of its functions should be
     * called exactly once.
     */
    respond?: {
        return: (result: any) => Promise<void>;
        throw: (error: CodeError) => Promise<void>;
    }
}

/**
 * Event raised in the event of a `Socket` being closed.
 */
export interface SocketCloseEvent {
    /**
     * Whether or not `Socket` was closed without errors.
     */
    wasClean: boolean;

    /**
     * Text indicating reason for `Socket` being closed.
     */
    reason: string;
}