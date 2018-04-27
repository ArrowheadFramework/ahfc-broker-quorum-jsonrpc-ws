/**
 * Represents a party that can own and exchange `Token`s.
 */
export interface Party {
    /**
     * Unencoded public key, or other identifier, identifying a party.
     *
     * # Valid Buffer Lengths
     *
     * The byte length of key __must__ be directly supported by the algorithm
     * specified in `keyalg` _without padding_. If, for example, `keyalg` is
     * `"ecdsa-secp256k1"`, then `key.length` must be `32`, even if a certain
     * amount of leading or trailing bytes would be `0`. If `keyalg` would be
     * `"rsa"`, then any valid RSA length is allowed (e.g., `128`, `256`, or
     * `512`). If no `keyalg` is specified no length restrictions are imposed.
     */
    key: Buffer;

    /**
     * Signature algoritm used to generate `key`, if `key` is known to be a
     * public key.
     *
     * # Valid Values
     *
     * If given, `keyalg` values must consist only of lower-case letters. If a
     * group qualifier is required, such as when an elliptic curve algorithm is
     * used, the group name follows the algorithm name and a dash. Examples of
     * valid values are `"dsa"`, `"ecdsa-secp256k1"` and `"rsa"`.
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
    keyalg?: string;

    /**
     * Common name of `Party`.
     */
    name: string;

    /**
     * Any other `Party` attributes.
     */
    attributes: { [attribute: string]: string };
}