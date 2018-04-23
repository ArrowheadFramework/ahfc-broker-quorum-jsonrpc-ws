import * as model from "../spec/model";
import * as service from "../spec/service";

/**
 * Implementation of the `BrokerTagging` Arrowhead service.
 */
export class BrokerTagging implements service.BrokerTagging {
    public getExchangeTags(query: model.TagQuery): Promise<model.TagResultSet> {
        throw new Error("Method not implemented.");
    }

    public getTokenTags(query: model.TagQuery): Promise<model.TagResultSet> {
        throw new Error("Method not implemented.");
    }

    public putExchangeTag(tag: model.Tag): Promise<string> {
        throw new Error("Method not implemented.");
    }

    public putTokenTag(tag: model.Tag): Promise<string> {
        throw new Error("Method not implemented.");
    }
}