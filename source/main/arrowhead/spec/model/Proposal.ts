import { isTokenSetQualified, PartySet, TokenSet } from ".";

/**
 * A `Token` exchange proposal.
 *
 * # Proposal Qualification
 *
 * A `Proposal` can be either _qualified_ or _unqualified_, depending on whether
 * it includes any sources of ambiguity. Concretely, a `Proposal` is qualified
 * if its `want` and `give` properties are qualified.
 */
export interface Proposal {
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
    want: TokenSet,

    /**
     * A description of what tokens are offered in return for the desired such.
     */
    give: TokenSet,
}

/**
 * Checks whether given `Proposal` can be accepted.
 *
 * @param proposal Checked `Proposal`.
 * @param fudgeInMs Permitted error when comparing current time to `Proposal`
 *                  `baseline` and `deadline`. Defaults to 300 ms.
 * @returns Whether `proposal` is acceptable.
 */
export function isProposalAcceptable(proposal: Proposal, fudgeInMs = 300) {
    if (!isProposalQualified(proposal)) {
        return false;
    }
    const now = Date.now();
    return now >= (proposal.baseline.getTime() - fudgeInMs)
        && now < (proposal.deadline.getTime() + fudgeInMs);
}

/**
 * Checks whether given `Proposal` is qualified.
 *
 * @param proposal Checked `Proposal`.
 * @returns Whether `proposal` is qualified.
 */
export function isProposalQualified(proposal: Proposal): boolean {
    return isTokenSetQualified(proposal.want)
        && isTokenSetQualified(proposal.give);
}