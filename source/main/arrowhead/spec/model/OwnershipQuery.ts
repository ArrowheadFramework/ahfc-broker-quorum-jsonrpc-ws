import { Party, Query } from ".";

/**
 * Specifies properties of a desired set of `Ownership`s.
 */
export interface OwnershipQuery extends Query {
    /**
     * Limits requested owners to those owning a `Token` with an `id` matching
     * any one of those given.
     */
    ids?: string[];

    /**
     * Limits requested owners to those included in the given array.
     */
    parties?: Party[];
}