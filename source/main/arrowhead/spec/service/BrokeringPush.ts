import { Proposal, ProposalError } from "../model";

/**
 * The Brokering service, used by consuming systems to receive messages related
 * to negotiating Token exchanges.
 *
 * # Receiver's Interface
 *
 * This interface is used by consuming AHF systems to _receive_ relevant
 * messages. The `Brokering` interface is used to _send_ messages.
 */
export interface BrokeringPush {
    /**
     * Called to notify about an incoming `Token` exchange `Proposal`.
     *
     * @param id Exchange `Proposal` identifier, if `proposal` is qualified.
     * @param senderKey Identifies party sending the `Proposal`.
     * @param proposal Exchange `Proposal`.
     */
    propose(id: string | null, senderKey: Buffer, proposal: Proposal);

    /**
     * Called to notify about a sent qualified Proposal being accepted.
     * 
     * @param id Exchange `Proposal` identifier.
     */
    accept(id: string);

    /**
     * Called to notify about a sent qualified Proposal being rejected.
     * 
     * @param id Exchange `Proposal` identifier.
     */
    reject(id: string);

    /**
     * Notifies about an accepted `Proposal` having become binding.
     * 
     * @param id Exchange `Proposal` identifier.
     */
    finalized(id: string);

    /**
     * Notifies about a proposed or accepted `Proposal` failing due to some
     * system error.
     * 
     * @param error Description of error.
     */
    failed(error: ProposalError);
}