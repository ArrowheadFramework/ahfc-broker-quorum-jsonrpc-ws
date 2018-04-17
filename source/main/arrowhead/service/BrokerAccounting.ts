import * as model from "../model";

/**
 * A service able to account for all `Token`s, `Ownership`s and `Exchange`s
 * known by some Broker system.
 */
export interface BrokerAccounting {
    /**
     * Gets `Party` representing the service using this interface.
     *
     * # The Broker is an Agent
     *
     * The AHF Broker acts on behalf of services using it. It may or may not
     * represent its clients using multiple different identities. It is
     * guaranteed, however, that the same service is always represented by the
     * same identity, unless the identity is changed by a system administrator
     * or some other authority.
     *
     * @returns Identity of calling service, in the form of a `Party` object.
     */
    getAgent(): model.Party;

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
 * A specification of what of any existing `Exchange` objects are desired.
 */
export interface ExchangeQuery extends model.Query {
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
    extends ExchangeQuery, model.ResultSet<model.Exchange> { }

/**
 * A specification of what `Ownership`s are desired.
 */
export interface OwnershipQuery extends model.Query {
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
    extends OwnershipQuery, model.ResultSet<model.Ownership> { }

/**
 * A specification of what of any existing `Token` objects are desired.
 */
export interface TokenQuery extends model.Query {
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
    extends TokenQuery, model.ResultSet<model.Token> { }