/**
 * A utility useful for logging information about significant events.
 *
 * # Message Formatting
 *
 * All methods of this interface accept a message string and any number of
 * format arguments. The message and arguments follow the same conventions as
 * the _node.js_ `util.format()` function.
 */
export interface Logger {
    /**
     * An error originating from within the application prevented it from
     * fulfilling some given task.
     *
     * @param message Description of failure.
     * @param params Any formatting arguments.
     */
    error(message: string, ...params: any[]);

    /**
     * An error originating from without the application prevented it from
     * fulfilling some given task.
     *
     * @param message Description of failure.
     * @param params Any formatting arguments.
     */
    warn(message: string, ...params: any[]);

    /**
     * An event of interest occurred.
     *
     * @param message Description of event.
     * @param params Any formatting arguments.
     */
    info(message: string, ...params: any[]);

    /**
     * An event only of interest for debugging purposes occurred.
     * 
     * @param message Description of event.
     * @param params Any formatting arguments.
     */
    debug(message: string, ...params: any[]);
}