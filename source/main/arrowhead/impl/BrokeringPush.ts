import * as model from "../spec/model";
import * as rpc from "../../util/rpc";
import * as service from "../spec/service";

/**
 * Implementation of the `BrokeringPush` Arrowhead service.
 *
 * # Receiver's Interface
 *
 * This class is used by consuming AHF services to _receive_ relevant messages.
 * The `Brokering` class is used to _send_ messages. From a source code
 * perspective, this means that instances of this class are used for sending
 * messages to consuming services with live RPC sockets.
 */
export class BrokeringPush implements service.BrokeringPush {
    private readonly socket: rpc.Socket;

    /**
     * Creates new `BrokeringPush` service instance.
     *
     * @param socket Socket to use for pushing brokering calls to a client.
     */
    public constructor(socket: rpc.Socket) {
        this.socket = socket;
    }

    public propose(id: string, sender: model.Party, proposal: model.Proposal): Promise<void> {
        return this.socket.call("BrokeringPush.propose", id, sender, proposal);
    }

    public accept(id: string, acceptor: model.Party, deadline: Date): Promise<void> {
        return this.socket.call("BrokeringPush.accept", id, acceptor, deadline);
    }

    public reject(id: string, rejector: model.Party): Promise<void> {
        return this.socket.call("BrokeringPush.reject", id, rejector);
    }

    public confirm(id: string): Promise<void> {
        return this.socket.call("BrokeringPush.confirm", id);
    }

    public abort(id: string): Promise<void> {
        return this.socket.call("BrokeringPush.abort", id);
    }
}
