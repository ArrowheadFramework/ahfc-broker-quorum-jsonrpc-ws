import { Party, Query } from ".";

/**
 * Specifies properties of a desired set of `Ownership`s.
 */
export interface OwnershipQuery extends Query {
    /**
     * Limits requested ownerships to those related to owners included in the
     * given array.
     */
    parties?: Party[];

    /**
     * Limits requested ownerships to those related to a `Token` with an `id`
     * matching any one of those given.
     */
    tokenIds?: string[];
}