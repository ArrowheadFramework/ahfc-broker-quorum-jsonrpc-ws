/**
 * Represents either a material or immaterial entity owned by a party, or a
 * kind of entity that could be owned by a party.
 *
 * # Token Credibility
 *
 * Objects of this type are meant to be used as part of cryptographic messaging
 * protocols, relying on distributed ledgers or related technologies, for the
 * purpose of keeping track of what entities can be owned. Tokens do not
 * themselves keep track of who owns them, or if they actually represent any
 * value of relevance. These properties have to be asserted through whatever
 * protocol they are used in.
 */
export interface Token {
    /**
     * A string uniquely idenitifying a particular entity, if relevant.
     *
     * Relevant strings could contain everything from simple names to serial
     * numbers. The `id` must, without being combined with a `kind` be able to
     * uniquely identify a single ownable entity.
     */
    id?: string,

    /**
     * A string classifying the general category this entity.
     *
     * Relevant string could containg everything from simple names to article
     * numbers.
     */
    kind: string,

    /**
     * A set of properties distinguishing this entity from other of the same
     * kind, if relevant.
     *
     * If the kind of the token would be `euro`, then a suitable property could
     * perhaps be `"amount": "100"`.
     */
    properties?: { [property: string]: string },
}

/**
 * A set of included `TokenSet`s.
 */
export interface TokenAND {
    kind: "_and",
    tokens: TokenSet[];
}

/**
 * A set of _at least one_ included `TokenSet`.
 */
export interface TokenIOR {
    kind: "_ior",
    tokens: TokenSet[];
}

/**
 * A set of _exactly one_ included `TokenSet`.
 */
export interface TokenXOR {
    kind: "_xor",
    tokens: TokenSet[];
}

/**
 * Represents any kind of `Token` object set.
 */
export type TokenSet = Token | TokenAND | TokenIOR | TokenXOR;

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
 * Checks whether given `tokens` represent a fully qualified set of `Tokens`s.
 *
 * @param set Checked `TokenSet`.
 * @returns Whether given `TokenSet` is fully qualified.
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
 * Checks whether given `token` is fully qualified.
 *
 * @param token Checked `Token`.
 * @returns Whether given `Token` is fully qualified.
 */
export function isTokenQualified(token: Token): boolean {
    return typeof token.id === "string";
}