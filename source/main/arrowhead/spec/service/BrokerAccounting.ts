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
     * @returns Promise of identity of calling service, in the form of a `Party`
     *          object.
     */
    getAgent(): Promise<model.Party>;

    /**
     * Queries for `Exchange`s.
     * 
     * @param query Specification of what `Exchange`s to acquire.
     * @returns Promise of any `Exchange`s matching the given `ExchangeQuery`.
     */
    getExchanges(query: model.ExchangeQuery): Promise<model.ExchangeResultSet>;

    /**
     * Queries for `Ownership`s.
     * 
     * @param query Specification of what `Ownership`s to acquire.
     * @returns Promise of any `Ownership` objects matching given
     *          `OwnershipQuery`.
     */
    getOwnerships(query: model.OwnershipQuery): Promise<model.OwnershipResultSet>;

    /**
     * Queries for `Token`s.
     * 
     * @param query Specification of what `Token`s to acquire.
     * @returns Promise of any `Token`s matching the given `TokenQuery`.
     */
    getTokens(query: model.TokenQuery): Promise<model.TokenResultSet>;
}