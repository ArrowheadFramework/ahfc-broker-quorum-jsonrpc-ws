/**
 * An `Error` with an arbitrary integer code.
 *
 * # RPC Error Codes
 *
 * The purpose of this class is to allow RPC methods to throw errors with
 * arbitrary protocol codes. Negative codes are reserved for internal use.
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

/**
 * Internal error codes.
 *
 * @private
 */
export const codes = {
    INVALID_REQUEST: -32600,
    METHOD_NOT_FOUND: -32601,
    INVALID_PARAMS: -32602,
    INTERNAL_ERROR: -32603,
};