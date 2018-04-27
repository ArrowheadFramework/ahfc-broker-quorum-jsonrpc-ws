import { Proposal } from "../model";

/**
 * A service useful for exchanging `Token`s through a three-step process.
 *
 * # Receiver's Interface
 *
 * This interface is used by consuming AHF systems to _receive_ relevant
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
     * @param id Exchange `Proposal` identifier, if `proposal` is qualified.
     * @param proposerKey Identifies party sending the `Proposal`.
     * @param proposal Exchange `Proposal`.
     * @returns Promise of operation completion.
     */
    propose(id: string | null, proposerKey: Buffer, proposal: Proposal): Promise<void>;

    /**
     * Called to notify about a previously sent `Proposal` being accepted.
     * 
     * @param id Exchange `Proposal` identifier.
     * @param acceptorKey Identifies party accepting `Proposal`.
     * @param deadline Moment in time when the received acceptance expires.
     * @returns Promise of operation completion.
     */
    accept(id: string, acceptorKey: Buffer, deadline: Date): Promise<void>;

    /**
     * Called to notify about a previously sent `Proposal` being rejected.
     * 
     * @param id Exchange `Proposal` identifier.
     * @param rejectorKey Identifies party rejecting `Proposal`.
     * @returns Promise of operation completion.
     */
    reject(id: string, rejectorKey: Buffer): Promise<void>;

    /**
     * Called to notify about a previously accepted `Proposal` being confirmed.
     *
     * @param id Exchange `Proposal` identifier.
     * @returns Promise of operation completion.
     */
    confirm(id: string): Promise<void>;

    /**
     * Called to notify about a previously accepted `Proposal` being aborted.
     *
     * @param id Exchange `Proposal` identifier.
     * @returns Promise of operation completion.
     */
    abort(id: string): Promise<void>;
}