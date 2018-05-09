import { ProposalFilter } from "../model";

/**
 * The `BrokerSession` service, allows a consuming system to create and manage
 * its own Broker session.
 */
export interface BrokerSession {
    /**
     * Gets key of `Party` used to represent service consumer.
     */
    getAgentKey(): Promise<Buffer>;

    /**
     * Gets last submitted callback, if any.
     *
     * @returns Previously submitted callback.
     */
    getCallback(): Promise<string | null>;

    /**
     * Gets last submitted `ProposalFilter`, if any.
     *
     * @returns Previously submitted `ProposalFilter`.
     */
    getProposalFilter(): Promise<ProposalFilter | null>;

    /**
     * Replaces the current session callback with provided such.
     * 
     * @param callback Callback to save.
     */
    setCallback(callback?: string): Promise<void>;

    /**
     * Replaces the current session `ProposalFilter` with the provided such.
     *
     * @param proposalFilter `ProposalFilter` to save.
     */
    setProposalFilter(proposalFilter?: ProposalFilter): Promise<void>;
}