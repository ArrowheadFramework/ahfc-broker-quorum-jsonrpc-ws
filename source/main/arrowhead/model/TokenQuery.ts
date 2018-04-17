import { Party, Query } from ".";

/**
 * Specifies properties of a desired set of `Token`s.
 */
export interface TokenQuery extends Query {
    /**
     * Limits requested `Token` objects to those with an `id` matching any
     * one of those given.
     */
    ids?: string[];

    /**
     * Limits requested `Token` objects to those with a `kind` matching any
     * one of those given.
     */
    kinds?: string[];

    /**
     * Requests only `Token`s owned by identified `Party`.
     */
    owner?: Party;
}