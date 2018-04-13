import * as model from "../model";

/**
 * Represents an Arrowhead service accounting for previously completed
 * ownership exchanges, exchanging parties, and exchanged tokens.
 */
export interface BrokerAccounting {
    /**
     * Requests `Exchange` by its unique `id`.
     * 
     * @param exchangeId `id` of reqested `Exchange`.
     * @returns `Exchange`, or `null` if not found.
     */
    getExchange(exchangeId: string): model.Exchange | null;

    /**
     * Queries for `Exchange`s.
     * 
     * @param query Specification of what `Exchange`s to acquire.
     * @returns Any `Exchange`s matching the given `ExchangeQuery`.
     */
    getExchanges(query: ExchangeQuery): ExchangeResultSet;

    /**
     * Attemts to resolve what `Party` owns the identified `Token`.
     * 
     * @param tokenId `id` of some `Token`.
     * @returns `Party`, or `null` if no matching `Token` exists.
     */
    getOwnerOf(tokenId: string): model.Party | null;

    /**
     * Requests `Token` by uts unique `id`.
     * 
     * @param tokenId `id` of requested `Token`.
     * @returns `Token`, or `null` if not found.
     */
    getToken(tokenId: string): model.Token | null;

    /**
     * Queries for `Token`s.
     * 
     * @param query Specification of what `Token`s to acquire.
     * @returns Any `Token`s matching the given `TokenQuery`.
     */
    getTokens(filter: TokenQuery): TokenResultSet;
}

/**
 * A specification of what of any existing `Exchange` objects are desired.
 */
export interface ExchangeQuery {
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

    /**
     * Number of `Exchange`s to exclude from the result, from the beginning of
     * the full sequence of items matching all other query criteria.
     */
    offset?: number;

    /**
     * The maximum number of `Exchange`s to include in the result.
     */
    limit?: number;
}

/**
 * A specification of what `Exchange` objects were retrieved in response to some
 * `ExchangeQuery`.
 *
 * An `ExchangeResultSet` may contain less `Exchange`s than requested in its
 * corresponding `ExchangeQuery`, if deemed necessary for performance-related
 * reasons.
 */
export interface ExchangeResultSet extends ExchangeQuery {
    /**
     * If the original `ExchangeQuery` specified an offset larger than the
     * number of available `Exchange`s, this field is changed to that number.
     */
    offset: number;

    /**
     * If the original `ExchangeQuery` specified a limit larger than the number
     * of `Exchange`s actually provided, the field is set to the actual number
     * of objects.
     */
    limit: number;

    /**
     * An `Array` of the `Exchange`s matching the original query. May be empty.
     */
    exchanges: model.Exchange[];
}

/**
 * A specification of what of any existing `Token` objects are desired.
 */
export interface TokenQuery {
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

    /**
     * Number of `Tokens`s to exclude from the result, from the beginning of
     * the full sequence of items matching all other query criteria.
     */
    offset?: number;

    /**
     * The maximum number of `Token`s to include in the result.
     */
    limit?: number;
}

/**
 * A specification of what `Token` objects were retrieved in response to some
 * `TokenQuery`.
 *
 * An `TokenResultSet` may contain less `Token`s than requested in its
 * corresponding `TokenQuery`, if deemed necessary for performance-related
 * reasons.
 */
export interface TokenResultSet extends TokenQuery {
    /**
     * If the original `TokenQuery` specified an offset larger than the number
     * of available `Token`s, this field is changed to that number.
     */
    offset: number;

    /**
     * If the original `TokenQuery` specified a limit larger than the number of
     * `Token`s actually provided, the field is set to the actual number of
     * objects.
     */
    limit: number;

    /**
     * An `Array` of the `Token`s matching the original query. May be empty.
     */
    tokens: model.Token[];
}