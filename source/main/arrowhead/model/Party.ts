/**
 * Represents the identity of a single party.
 */
export interface Party {
    /**
     * Unencoded public key identifying a party.
     *
     * # Valid Buffer Lengths
     *
     * The byte length of key __must__ be directly supported by the algorithm
     * specified in `keyalg` _without padding_. If, for example, `keyalg` is
     * `"ecdsa-secp256k1"`, then `key.length` must be `32`, even if a certain
     * amount of leading or trailing bytes would be `0`. If `keyalg` would be
     * `"rsa"`, then any valid RSA length is allowed (e.g., `128`, `256`, or
     * `512`).
     */
    key: Buffer;

    /**
     * Signature algoritm used to generate `key`.
     *
     * # Valid Values
     *
     * `keyalg` values must consist only of lower-case letters. If a group
     * qualifier is required, such as when an elliptic curve algorithm is used,
     * the group name follows the algorithm name and a dash. Examples of valid
     * values are `"dsa"`, `"ecdsa-secp256k1"` and `"rsa"`.
     *
     * ## Standardized Values
     *
     * The algorithm and group names should, if possible, conform to the
     * _TLS SignatureAlgorithm Registry_ and _TLS Supported Groups Registry_ of
     * the [IANA Transport Layer Security (TLS) Parameters][iana] document. The
     * _Description_ column of each table contains the identifiers to be used.
     *
     * [iana]: https://www.iana.org/assignments/tls-parameters/tls-parameters.xhtml
     */
    keyalg: string;
}

/**
 * The set of all parties.
 */
export type PartyAll = undefined | null | {};

/**
 * An array of `Party` objects.
 */
export interface PartyArray {
    parties: Party[];
}

/**
 * Represents any kind of `Party` object set.
 */
export type PartySet = Party | PartyAll | PartyArray;

/**
 * Checks whether given `parties` represents a single `Party`.
 * 
 * @param set Checked `PartySet`.
 * @returns Whether given `PartySet` is of type `Party`.
 */
export function isParty(set: PartySet): set is Party {
    return (<Party>set).key !== undefined; 
}

/**
 * Checks whether given `parties` represents all relevant `Party` instances.
 * 
 * @param set Checked `PartySet`.
 * @returns Whether given `PartySet` is of type `PartyALL`.
 */
export function isPartyAll(set: PartySet): set is PartyAll {
    return set === undefined || set === null || typeof set === "object"
        && set["key"] === undefined && set["parties"] === undefined;
}

/**
 * Checks whether given `parties` represents an array of included `Party`
 * instances.
 * 
 * @param parties Checked `PartySet`.
 * @returns Whether given `PartySet` is of type `PartyLIST`.
 */
export function isPartyArray(set: PartySet): set is PartyArray {
    return (<PartyArray>set).parties !== undefined;
}

/**
 * @returns An object representing all relevant `Party` instances.
 */
export function partyAll(): PartyAll {
    return undefined;
}
