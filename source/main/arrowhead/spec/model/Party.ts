/**
 * Represents a party that can own and exchange `Token`s.
 */
export interface Party {
    /**
     * Unencoded public key, or other identifier, identifying a party.
     */
    key: Buffer;

    /**
     * Signature algoritm used to generate `key`, if `key` is known to be a
     * public key.
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