import { Logger } from "./Logger";

/**
 * Writes significant events to the application console.
 */
export class ConsoleLogger implements Logger {
    public error(message: string, ...params: any[]) {
        console.error(`! ${message}`, ...params);
    }

    public warn(message: string, ...params: any[]) {
        console.warn(`- ${message}`, ...params)
    }

    public info(message: string, ...params: any[]) {
        console.info(`+ ${message}`, ...params)
    }

    public debug(message: string, ...params: any[]) {
        console.debug(`? ${message}`, ...params)
    }
}