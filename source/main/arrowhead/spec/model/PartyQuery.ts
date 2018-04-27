import { Query } from ".";

/**
 * Specifies properties of a desired set of `Party` items.
 */
export interface PartyQuery extends Query {
    /**
     * Limits requested Parties to those with a `key` included in given array.
     */
    keys?: Buffer[];

    /**
     * Limits requested Parties to those with a `name` included in given array.
     */
    names?: string[];
}