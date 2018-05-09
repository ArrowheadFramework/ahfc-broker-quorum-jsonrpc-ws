import { Proposal } from "../model";

/**
 * The Brokering service, used by consuming systems to send messages related to
 * negotiating Token exchanges.
 *
 * # Sender's Interface
 *
 * This interface is used by consuming AHF systems to _send_ relevant messages.
 * The `BrokeringPush` interface is used to _receive_ messages.
 */
export interface Brokering {
    /**
     * Proposes a `Token` exchange.
     *
     * @param proposal Exchange `Proposal`.
     * @param receiverKeys The receivers of `proposal`. An empty array is
     *        interpreted as representing all possible receivers.
     * @returns Promise of proposal identifier, unless proposal is unqualified.
     */
    propose(proposal: Proposal, ...receiverKeys: Buffer[]): Promise<string | null>;

    /**
     * Accepts an _acceptable_ `Proposal`, making it pending confirmation.
     *
     * __Errors__. If the accepted `Proposal` doesn't exist, or if `deadline`
     * has already expired, the call fails and an `Error` is thrown.
     * 
     * @param id Exchange `Proposal` identifier.
     * @param deadline Moment when this acceptance ceases to be valid.
     * @returns Promise of operation completion.
     */
    accept(id: string, deadline: Date): Promise<void>;

    /**
     * Rejects an _acceptable_ `Proposal`.
     *
     * __Errors__. If the rejected `Proposal` doesn't exist, the call fails
     * and an `Error` is thrown.
     *
     * @param id Exchange `Proposal` identifier.
     * @returns Promise of operation completion.
     */
    reject(id: string): Promise<void>;

    /**
     * Confirms an accepted `Proposal`, making it binding.
     *
     * __Errors__. If the confirmed `Proposal` was not originally proposed by
     * the caller, is qualified, and was accepted by `acceptor`, the call fails
     * and an `Error` is thrown.
     * 
     * @param id Exchange `Proposal` identifier.
     * @param acceptorKey Identifies party having accepted `Proposal`.
     * @returns Promise of operation completion.
     */
    confirm(id: string, acceptorKey: Buffer): Promise<void>;

    /**
     * Aborts accepted exchange `Proposal`, making it null and void.
     * 
     * __Errors__. If the aborted `Proposal` was not originally proposed by the
     * caller, is qualified, and was accepted by `acceptor`, the call fails and
     * an `Error` is thrown.
     * 
     * @param id Exchange `Proposal` identifier.
     * @param acceptorKey Identifies party having accepted `Proposal`.
     * @returns Promise of operation completion.
     */
    abort(id: string, acceptorKey: Buffer): Promise<void>;
}
