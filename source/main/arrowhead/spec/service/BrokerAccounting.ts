import * as model from "../model";

/**
 * A service able to account for all parties and exchanges known to a Broker
 * system.
 *
 * # Object Visibility
 *
 * The service only serves objects a consuming system is authorized to see,
 * meaning that the results of calling the service functions may be different
 * for different consumers.
 */
export interface BrokerAccounting {
    /**
     * Requests `Party` identifier used to represent the calling system.
     *
     * @returns Promise of `Party` identifier.
     */
    getAgentId(): Promise<string>;

    /**
     * Queries for `Exchange`s.
     * 
     * @param query Specification of what `Exchange`s to acquire.
     * @returns Promise of any `Exchange`s matching the given `ExchangeQuery`.
     */
    getExchanges(query: model.ExchangeQuery): Promise<model.ExchangeResultSet>;

    /**
     * Queries for `Party` objects.
     * 
     * @param query Specification of what `Party` objects to acquire.
     * @returns Promise of any `Party` objects matching given `PartyQuery`.
     */
    getParties(query: model.PartyQuery): Promise<model.PartyResultSet>;
}