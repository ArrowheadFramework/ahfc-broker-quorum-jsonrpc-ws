import { Proposal } from ".";

/**
 * Represents a completed `Token` exchange.
 */
export interface Exchange {
    /**
     * String uniquely identifying this `Exchange`.
     */
    id: string;

    /**
     * The date and time at which the `Exchange` was finalized.
     */
    completedAt: Date;

    /**
     * The accepted and confirmed exchange `Proposal`.
     */
    proposal: Proposal;

    /**
     * The public key of the party that proposed and confirmed the `proposal`.
     *
     * This party gave up the tokens in `proposal.give`, and received ownership
     * of the tokens in `proposal.want`.
     */
    proposerKey: Buffer;

    /**
     * The public key of the party that accepted the `proposal`.
     *
     * This party gave up the tokens in `proposal.want`, and received ownership
     * of the tokens in `proposal.give`.
     */
    acceptorKey: string;
}