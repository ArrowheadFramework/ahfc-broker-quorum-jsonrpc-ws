import * as model from "../spec/model";
import * as service from "../spec/service";

/**
 * Implementation of the `BrokerStore` Arrowhead service.
 */
export class BrokerStore implements service.BrokerStore {
    getExchanges(query: model.ExchangeQuery): Promise<model.ExchangeResultSet> {
        throw new Error("Method not implemented.");
    }

    getParties(query: model.PartyQuery): Promise<model.PartyResultSet> {
        throw new Error("Method not implemented.");
    }
}