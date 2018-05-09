import * as model from "../spec/model";
import * as service from "../spec/service";

/**
 * Implementation of the `BrokerSession` Arrowhead service.
 */
export class BrokerSession implements service.BrokerSession {
    public getAgentKey(): Promise<Buffer> {
        throw new Error("Method not implemented.");
    }

    public getCallback(): Promise<string | null> {
        throw new Error("Method not implemented.");
    }

    public getProposalFilter(): Promise<model.ProposalFilter | null> {
        throw new Error("Method not implemented.");
    }

    public setCallback(callback?: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public setProposalFilter(proposalFilter?: model.ProposalFilter): Promise<void> {
        throw new Error("Method not implemented.");
    }
}