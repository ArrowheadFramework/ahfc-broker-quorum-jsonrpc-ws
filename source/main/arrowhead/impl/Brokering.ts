import * as model from "../spec/model";
import * as service from "../spec/service";

/**
 * Implementation of the `Brokering` Arrowhead service.
 *
 * # Sender's Interface
 *
 * This class is used for _sending_ relevant messages. The `BrokeringPush` class
 * is used for _receiving_ messages.
 */
export class Brokering implements service.Brokering {
    public propose(proposal: model.Proposal): Promise<[Buffer, string][]> {
        throw new Error("Method not implemented.");
    }

    public accept(id: string, deadline: Date): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public reject(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public confirm(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public abort(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}