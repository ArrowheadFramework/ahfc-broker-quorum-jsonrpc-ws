import * as model from ".";

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
    proposal: model.Proposal;

    /**
     * The party that sent and confirmed the `proposal`.
     *
     * This party gave up the tokens in `proposal.give`, and received ownership
     * of the tokens in `proposal.want`.
     */
    sender: model.Party;

    /**
     * The party that received and accepted the `proposal`.
     *
     * This party gave up the tokens in `proposal.want`, and received ownership
     * of the tokens in `proposal.give`.
     */
    receiver: model.Party;
}