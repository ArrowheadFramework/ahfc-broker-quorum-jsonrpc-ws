import * as model from "../spec/model";
import * as service from "../spec/service";

/**
 * Implementation of the `BrokeringPush` Arrowhead service.
 *
 * # Receiver's Interface
 *
 * This class is used for _receiving_ relevant messages. The `Brokering` class
 * is used for _sending_ messages.
 */
export class BrokeringPush implements service.BrokeringPush {
    public propose(id: string, sender: model.Party, proposal: model.Proposal) {
        throw new Error("Method not implemented.");
    }

    public accept(id: string, deadline: Date) {
        throw new Error("Method not implemented.");
    }

    public reject(id: string) {
        throw new Error("Method not implemented.");
    }

    public confirm(id: string) {
        throw new Error("Method not implemented.");
    }

    public abort(id: string) {
        throw new Error("Method not implemented.");
    }
}
