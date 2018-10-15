import * as model from "../model";

/**
 * The `BrokerStore` service, accounts for past exchange events as well as
 * the identities of any exchange parties.
 */
export interface BrokerStore {

    /**
     * Queries for `Exchange` objects, representing finalized `Token` exchanges.
     * 
     * @param query Specification of what `Exchange`s to acquire.
     * @returns Promise of any `Exchanges` matching the given `ExchangeQuery`.
     */
    getExchanges(query: model.ExchangeQuery): Promise<model.ExchangeResultSet>;

    /**
     * Queries for `Party` objects, representing known parties that can or have
     * exchanged `Tokens`.
     * 
     * @param query Specification of what `Party` objects to acquire.
     * @returns Promise of any `Party` objects matching given `PartyQuery`.
     */
    getParties(query: model.PartyQuery): Promise<model.PartyResultSet>;
}