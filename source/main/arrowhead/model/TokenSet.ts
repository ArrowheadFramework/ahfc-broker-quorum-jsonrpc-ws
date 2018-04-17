import { Token } from ".";

/**
 * A logical set of `Token`s.
 *
 * # Logical Sets
 * 
 * A `TokenSet` is logical in the sense that it can contain alternatives rather
 * than being a regular list of included `Tokens`. This is primarily intended to
 * facilitate the presentation of alternatives when proposing token exchanges,
 * as described in the documentation of the `Brokering` service interface.
 */
export type TokenSet = Token | TokenAND | TokenIOR | TokenXOR;

/**
 * A set of alternatives where _all_ `TokenSet`s must be chosen.
 */
export interface TokenAND {
    kind: "_and",
    tokens: TokenSet[];
}

/**
 * A set of alternatives where _at least one_ `TokenSet` must be chosen.
 */
export interface TokenIOR {
    kind: "_ior",
    tokens: TokenSet[];
}

/**
 * A set of alternatives where _exactly one_ `TokenSet` must be chosen.
 */
export interface TokenXOR {
    kind: "_xor",
    tokens: TokenSet[];
}

/**
 * Checks whether given `tokens` represent a single `Token`.
 * 
 * @param set Checked `TokenSet`.
 * @returns Whether given `TokenSet` is of type `Token`.
 */
export function isToken(set: TokenSet): set is Token {
    return set["tokens"] === undefined; 
}

/**
 * Checks whether given `tokens` represent a logical AND clause of `TokenSet`s.
 * 
 * @param set Checked `TokenSet`.
 * @returns Whether given `TokenSet` is of type `TokenAND`.
 */
export function isTokenAND(set: TokenSet): set is TokenAND {
    return set.kind === "_and";
}

/**
 * Checks whether given `tokens` represent a logical IOR clause of `TokenSet`s.
 *
 * @param set Checked `TokenSet`.
 * @returns Whether given `TokenSet` is of type `TokenIOR`.
 */
export function isTokenIOR(set: TokenSet): set is TokenIOR {
    return set.kind === "_ior";
}

/**
 * Checks whether given `tokens` represent a logical XOR clause of `TokenSet`s.
 *
 * @param set Checked `TokenSet`.
 * @returns Whether given `TokenSet` is of type `TokenXOR`.
 */
export function isTokenXOR(set: TokenSet): set is TokenXOR {
    return set.kind === "_xor";
}

/**
 * Checks whether given `tokens` represent a qualified set of `Tokens`s.
 *
 * @param set Checked `TokenSet`.
 * @returns Whether given `TokenSet` is qualified.
 */
export function isTokenSetQualified(set: TokenSet): boolean {
    if (isToken(set)) {
        return isTokenQualified(set);
    }
    if (isTokenAND(set)) {
        return set.tokens.every(t => isTokenSetQualified(t));
    }
    return false;
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