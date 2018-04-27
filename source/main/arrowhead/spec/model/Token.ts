/**
 * Represents an ownable material or immaterial entity.
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