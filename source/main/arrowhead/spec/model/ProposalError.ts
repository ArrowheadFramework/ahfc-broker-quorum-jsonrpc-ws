/**
 * Indicates how a Broker failed to maintain or finalize some `Proposal`.
 */
export interface ProposalError {
    /**
     * `Proposal` identifier.
     */
    id?: String;

    /**
     * Identifies category of error.
     */
    kind: String;

    /**
     * Arbitrary data associated with error.
     */
    data: any;

    /**
     * Optional description of error intended for developers.
     */
    description?: String;
}