import { Query } from ".";

/**
 * Specifies properties of a desired set of `Exchange` objects.
 */
export interface ExchangeQuery extends Query {
    /**
     * Limits requested `Exchange` objects to those with an `id` matching any
     * one of those given.
     */
    ids?: string[];

    /**
     * Requests only `Exchange`s completed after given `Date`.
     */
    createdAfter?: Date;

    /**
     * Requests only `Exchange`s completed prior to given `Date`.
     */
    createdBefore?: Date;

    /**
     * Requests only `Exchange`s where `senderId` matches any one given.
     */
    proposerKeys?: Buffer[];

    /**
     * Requests only `Exchanges`s where `receiverId` matches any one given.
     */
    acceptorKeys?: Buffer[];
}