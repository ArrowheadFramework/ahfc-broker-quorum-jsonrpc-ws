import * as events from 'events';
import { Socket } from ".";

/**
 * An abstract server listening for Remote Procedure Calls (RPCs).
 */
export interface Server extends events.EventEmitter {
    /**
     * Unique server instance identifier.
     */
    readonly id: string;

    /**
     * Registers `"connection"` event listener.
     *
     * @param event `"connection"`
     * @param listener Callback executed when a `"connection"` event is raised.
     */
    addListener(event: "connection", listener: (socket: Socket) => void);

    /**
     * Registers `"error"` event listener.
     *
     * @param event `"error"`
     * @param listener Callback executed when a `"error"` event is raised.
     */
    addListener(event: "error", listener: (error: Error) => void);

    /**
     * Deregisters `"connection"` event listener.
     *
     * @param event `"connection"`
     * @param listener Callback executed when a `"connection"` event is raised.
     */
    removeListener(event: "connection", listener: (socket: Socket) => void);

    /**
     * Deregisters `"error"` event listener.
     *
     * @param event `"error"`
     * @param listener Callback executed when a `"error"` event is raised.
     */
    removeListener(event: "error", listener: (error: Error) => void);

    /**
     * Attempts to start accepting incoming connections via given `port`.
     * 
     * @param port Port number.
     * @returns Promise of server listening on given `port`.
     */
    listen(port: number): Promise<void>;

    /**
     * Closes server, making it stop listening for incoming connections.
     *
     * @returns Promise of close completion.
     */
    close(): Promise<void>;
}