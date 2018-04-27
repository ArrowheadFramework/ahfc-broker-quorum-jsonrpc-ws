import * as model from "../spec/model";
import * as service from "../spec/service";

/**
 * Implementation of the `BrokerAccounting` Arrowhead service.
 */
export class BrokerAccounting implements service.BrokerAccounting {
    getAgentId(): Promise<string> {
        throw new Error("Method not implemented.");
    }

    getExchanges(query: model.ExchangeQuery): Promise<model.ExchangeResultSet> {
        throw new Error("Method not implemented.");
    }

    getParties(query: model.PartyQuery): Promise<model.PartyResultSet> {
        throw new Error("Method not implemented.");
    }
}