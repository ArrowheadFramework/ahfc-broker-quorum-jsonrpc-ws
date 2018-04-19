import { Party, Query } from ".";

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
     * Requests only `Exchange`s completed prior to the given `Date`.
     */
    before?: Date;

    /**
     * Requests only `Exchange`s completed after the given `Date`.
     */
    after?: Date;

    /**
     * Requests only `Exchange`s where the identified `Party` is _sender_.
     */
    sender?: Party;

    /**
     * Requests only `Exchanges`s where the identified `Party` is _receiver_.
     */
    receiver?: Party;
}