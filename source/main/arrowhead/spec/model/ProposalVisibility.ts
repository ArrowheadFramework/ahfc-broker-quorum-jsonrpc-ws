/**
 * Expresses the level of visibility of some `Proposal`.
 */
export enum ProposalVisibility {
    /**
     * The proposal is sent in secret to each receiver, and the receivers are
     * __not__ notified about which other parties received the proposal.
     */
    Private = 0,

    /**
     * The proposal is sent in secret to each receiver, and the receivers are
     * notified about which other parties received the proposal.
     */
    Protected = 1,

    /**
     * The proposal is sent visibly to all parties in the given trading network,
     * including any parties not receiving the proposal.
     */
    Public = 2,
}