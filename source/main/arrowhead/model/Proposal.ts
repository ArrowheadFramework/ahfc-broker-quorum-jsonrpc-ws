import * as model from ".";

/**
 * A `Token` exchange proposal.
 *
 * # Proposal Qualification
 *
 * `Proposal`s can be either _qualified_ or _unqualified_, depending on whether
 * the include any sources of ambiguity. Concretely, a `Proposal` is qualified
 * if its `want` and `give` properties are qualified.
 */
export interface Proposal {
    /**
     * If a `Proposal` is open, then all receivers of the `Proposal` are
     * notified about its other receivers. If it is closed, on the other hand,
     * then each receiver will be unaware of any other receivers.
     *
     * If a qualified `Token` is offered, or there is a limited supply of the
     * kind of offered `Token`, then keeping a multi-receiver `Proposal` open is
     * a way to avoid loss of confidence if an accepting party would not be
     * allowed to perform an exchange. An open multi-receiver `Proposal` is
     * effectively an auction where each bidder is aware of the competition.
     */
    open: boolean,

    /**
     * A public `Proposal` is visible to all participants in the trading network
     * where it is submitted, while a private such is only visible to its
     * receivers.
     */
    public: boolean,

    /**
     * The moment in time when this `Proposal` expires.
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
 */
export function isProposalQualified(proposal: Proposal): boolean {
    return model.isTokenSetQualified(proposal.want)
        && model.isTokenSetQualified(proposal.give);
}