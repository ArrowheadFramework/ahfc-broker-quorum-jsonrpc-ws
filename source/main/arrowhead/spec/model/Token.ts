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
     * A string classifying the general category of this entity.
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