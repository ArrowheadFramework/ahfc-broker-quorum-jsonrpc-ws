import { Socket } from ".";

/**
 * An abstract server listening for Remote Procedure Calls (RPCs).
 */
export interface Server {
    /**
     * Attempts to start acception incoming connections via given `port`.
     * 
     * @param port Port number.
     * @returns Promise of `Socket`.
     */
    listen(port: number): Promise<Socket>;
}