/**
 * An `Error` with an arbitrary positive integer code.
 */
export class CodeError extends Error {
    /**
     * Error code.
     */
    public readonly code: number;

    /**
     * Creates new `CodeError` with given `code` and `message`.
     *
     * @param code Error code.
     * @param message Error message.
     */
    public constructor(code: number, message: string) {
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, CodeError.prototype);
    }
}