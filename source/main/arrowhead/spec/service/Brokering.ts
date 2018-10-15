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
     * __Errors__. If `proposal` is qualified and more than one receiver is
     * identified the call fails and an `Error` is thrown.
     *
     * @param proposal Exchange `Proposal`.
     * @param receiverKeys The receivers of `proposal`. An empty array is
     *        interpreted as representing all possible receivers.
     * @returns Promise of proposal identifier, unless proposal is unqualified.
     */
    propose(proposal: Proposal, ...receiverKeys: Buffer[]): Promise<string | null>;

    /**
     * Accepts a _qualified_ `Proposal`, making it pending finalization.
     *
     * __Errors__. If the accepted `Proposal` doesn't exist the call fails and
     * an `Error` is thrown.
     * 
     * @param id Exchange `Proposal` identifier.
     * @returns Promise of operation completion.
     */
    accept(id: string): Promise<void>;

    /**
     * Rejects a _qualified_ `Proposal`.
     *
     * __Errors__. If the rejected `Proposal` doesn't exist the call fails
     * and an `Error` is thrown.
     *
     * @param id Exchange `Proposal` identifier.
     * @returns Promise of operation completion.
     */
    reject(id: string): Promise<void>;
}
