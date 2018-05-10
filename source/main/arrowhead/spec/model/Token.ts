/**
 * Represents an ownable material or immaterial entity.
 */
export interface Token {
    /**
     * A string uniquely idenitifying a particular entity, if given.
     */
    id?: string,

    /**
     * A string identifying the general category of this entity.
     */
    kind: string,

    /**
     * An arbitrary data structure distinguishing the entity from other of the
     * same `kind`.
     */
    data?: any,
}

/**
 * Checks whether given `token` is qualified.
 *
 * @param token Checked `Token`.
 * @returns Whether given `Token` is qualified.
 */
export function isTokenQualified(token: Token): boolean {
    return typeof token.id === "string";
}