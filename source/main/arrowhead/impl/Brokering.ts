import * as model from "../spec/model";
import * as service from "../spec/service";

/**
 * Implementation of the `Brokering` Arrowhead service.
 *
 * # Sender's Interface
 *
 * This class is used by consuming AHF services to _send_ relevant messages. The
 * `BrokeringPush` class is used to _receive_ messages.
 */
export class Brokering implements service.Brokering {
    public propose(receivers: model.PartySet, proposal: model.Proposal): Promise<string> {
        throw new Error("Method not implemented.");
    }

    public accept(id: string, deadline: Date): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public reject(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public confirm(id: string, acceptor: model.Party): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public abort(id: string, acceptor: model.Party): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
