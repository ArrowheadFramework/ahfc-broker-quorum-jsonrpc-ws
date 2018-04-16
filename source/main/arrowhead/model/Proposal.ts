import * as model from ".";

/**
 * A `Token` exchange proposal.
 *
 * # Proposal Qualification
 *
 * `Proposal`s can be either _qualified_ or _unqualified_, depending on whether
 * it includes any sources of ambiguity. Concretely, a `Proposal` is qualified
 * if its `want` and `give` properties are qualified.
 */
export interface Proposal {
    /**
     * If a `Proposal` is open, then all receivers of the `Proposal` are
     * notified about its other receivers. If it is closed, on the other hand,
     * then each receiver will be unaware of any other receivers.
     */
    open: boolean,

    /**
     * A public `Proposal` is visible to all participants in the trading network
     * where it is submitted, while a private such is only visible to its
     * receivers.
     */
    public: boolean,

    /**
     * The moment in time when this `Proposal` becomes acceptable.
     */
    baseline: Date,

    /**
     * The moment in time when this `Proposal` ceases to be acceptable.
     */
    deadline: Date,

    /**
     * A description of what tokens are desired.
     */
    want: model.TokenSet,

    /**
     * A description of what tokens are offered in return for the desired such.
     */
    give: model.TokenSet,

    /**
     * A description of what parties received the proposal.
     */
    receivers: model.PartySet,
}

/**
 * Checks whether given `Proposal` is qualified.
 *
 * @param proposal Checked `Proposal`.
 * @returns Whether `proposal` is qualified.
 */
export function isProposalQualified(proposal: Proposal): boolean {
    return model.isTokenSetQualified(proposal.want)
        && model.isTokenSetQualified(proposal.give);
}