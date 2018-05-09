import * as model from "../spec/model";
import * as rpc from "../../util/rpc";
import * as service from "../spec/service";

/**
 * Implementation of the `BrokeringPush` Arrowhead service.
 *
 * # Receiver's Interface
 *
 * This class is used by consuming AHF systems to _receive_ relevant messages.
 * The `Brokering` class is used to _send_ messages. From a source code
 * perspective, this means that instances of this class are used for sending
 * messages to consuming systems with live RPC sockets.
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

    public propose(id: string | null, proposerKey: Buffer, proposal: model.Proposal): Promise<void> {
        return this.socket.call("BrokeringPush.propose", id, proposerKey, proposal);
    }

    public accept(id: string, acceptorKey: Buffer, deadline: Date): Promise<void> {
        return this.socket.call("BrokeringPush.accept", id, acceptorKey, deadline);
    }

    public reject(id: string, rejectorKey: Buffer): Promise<void> {
        return this.socket.call("BrokeringPush.reject", id, rejectorKey);
    }

    public confirm(id: string): Promise<void> {
        return this.socket.call("BrokeringPush.confirm", id);
    }

    public abort(id: string): Promise<void> {
        return this.socket.call("BrokeringPush.abort", id);
    }

    public finalized(id: string): Promise<void> {
        return this.socket.call("BrokeringPush.finalized", id);
    }

    public error(error: model.ProposalError): Promise<void> {
        return this.socket.call("BrokeringPush.error", error);
    }
}
