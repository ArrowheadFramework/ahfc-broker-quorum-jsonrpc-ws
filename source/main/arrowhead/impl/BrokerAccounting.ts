import * as model from "../spec/model";
import * as service from "../spec/service";

/**
 * Implementation of the `BrokerAccounting` Arrowhead service.
 */
export class BrokerAccounting implements service.BrokerAccounting {
    public getAgent(): Promise<model.Party> {
        throw new Error("Method not implemented.");
    }

    public getExchanges(query: model.ExchangeQuery): Promise<model.ExchangeResultSet> {
        throw new Error("Method not implemented.");
    }

    public getOwnerships(query: model.OwnershipQuery): Promise<model.OwnershipResultSet> {
        throw new Error("Method not implemented.");
    }

    public getTokens(query: model.TokenQuery): Promise<model.TokenResultSet> {
        throw new Error("Method not implemented.");
    }
}