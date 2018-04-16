import * as model from "../model";

/**
 * A service able to account for all `Token`s, `Ownership`s and `Exchange`s
 * known by some Broker system.
 */
export interface BrokerAccounting {
    /**
     * Queries for `Exchange`s.
     * 
     * @param query Specification of what `Exchange`s to acquire.
     * @returns Any `Exchange`s matching the given `ExchangeQuery`.
     */
    getExchanges(query: ExchangeQuery): ExchangeResultSet;

    /**
     * Queries for `Ownership`s.
     * 
     * @param query Specification of what `Ownership`s to acquire.
     * @returns Any `Ownership` objects matching given `OwnershipQuery`.
     */
    getOwnerships(query: OwnershipQuery): OwnershipResultSet;

    /**
     * Queries for `Token`s.
     * 
     * @param query Specification of what `Token`s to acquire.
     * @returns Any `Token`s matching the given `TokenQuery`.
     */
    getTokens(query: TokenQuery): TokenResultSet;
}

/**
 * A specification of a desired set of `items`.
 */
export interface Query {
    /**
     * Number of items to exclude from the result, from the beginning of the
     * full sequence of items matching any other query criteria.
     */
    offset?: number;

    /**
     * The maximum number of items to include in the result.
     */
    limit?: number;
}

/**
 * A set of `items` matching some original `Query`.
 *
 * # Truncation
 *
 * The receiver of a `Query` is allowed to truncate the set of `items` in its
 * result. If, however, this is done, it must be reflected in the `limit` field
 * in the `ResultSet`.
 *
 * # Offset out of Bounds
 *
 * If the `offset` of a `Query` exceeds the number of matching items, the
 * `Query` receiver __must__ reduce the `offset` in the `ResultSet` to the
 * number of matching items, set `limit` to `0` and provide `items` as an empty
 * `Array`.
 */
export interface ResultSet<T> extends Query {
    /**
     * An `Array` of the items matching an original query. May be empty.
     */
    items: T[];
}

/**
 * A specification of what of any existing `Exchange` objects are desired.
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
    sender?: model.Party;

    /**
     * Requests only `Exchanges`s where the identified `Party` is _receiver_.
     */
    receiver?: model.Party;
}

/**
 * `Exchange`s retrieved in response to some `ExchangeQuery`.
 */
export interface ExchangeResultSet
    extends ExchangeQuery, ResultSet<model.Exchange> { }

/**
 * A specification of what `Ownership`s are desired.
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
    parties?: model.Party[];
}

/**
 * `Ownership`s retrieved in response to some `OwnershipQuery`.
 */
export interface OwnershipResultSet
    extends OwnershipQuery, ResultSet<model.Ownership> { }

/**
 * A specification of what of any existing `Token` objects are desired.
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
    owner?: model.Party;
}

/**
 * `Token`s retrieved in response to some `TokenQuery`.
 */
export interface TokenResultSet
    extends TokenQuery, ResultSet<model.Token> { }