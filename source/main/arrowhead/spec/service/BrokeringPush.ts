import * as model from "../model";

/**
 * A service useful for exchanging `Token`s through a three-step process.
 *
 * # Receiver's Interface
 *
 * This interface is used by consuming AHF services to _receive_ relevant
 * messages. The `Brokering` interface is used to _send_ messages.
 *
 * # Exchange State Machine
 *
 * See the documentation of the `Brokering` interface for more details about the
 * ownership exchange state machine.
 */
export interface BrokeringPush {
    /**
     * Called to notify about an incoming `Token` exchange `Proposal`.
     *
     * @param id Exchange `Proposal` identifier.
     * @param sender Party sending the `Proposal`.
     * @param proposal Exchange `Proposal`.
     */
    propose(id: string, sender: model.Party, proposal: model.Proposal);

    /**
     * Called to notify about a previously sent `Proposal` being accepted.
     * 
     * @param id Exchange `Proposal` identifier.
     * @param deadline Moment in time when the received acceptance expires.
     */
    accept(id: string, deadline: Date);

    /**
     * Called to notify about a previously sent `Proposal` being rejected.
     * 
     * @param id Exchange `Proposal` identifier.
     */
    reject(id: string);

    /**
     * Called to notify about a previously accepted `Proposal` being confirmed.
     *
     * @param id Exchange `Proposal` identifier.
     */
    confirm(id: string);

    /**
     * Called to notify about a previously accepted `Proposal` being aborted.
     *
     * @param id Exchange `Proposal` identifier.
     */
    abort(id: string);
}