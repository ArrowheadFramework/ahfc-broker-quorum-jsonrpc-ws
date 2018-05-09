import { isTokenExprValid, isTokenExprQualified, TokenExpr } from ".";

/**
 * A `Token` exchange proposal.
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
    want: TokenExpr,

    /**
     * A description of what tokens are offered in return for the desired such.
     */
    give: TokenExpr,
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
    if (!isProposalQualified(proposal) || !isProposalValid(proposal)) {
        return false;
    }
    const now = Date.now();
    return now >= (proposal.baseline.getTime() - fudgeInMs)
        && now < (proposal.deadline.getTime() + fudgeInMs);
}

/**
 * Checks whether given `Proposal` is valid.
 * 
 * @param proposal Checked `Proposal`
 * @returns Whether `proposal` is valid.
 */
export function isProposalValid(proposal: Proposal): boolean {
    return isTokenExprValid(proposal.want)
        && isTokenExprValid(proposal.give);
}

/**
 * Checks whether given `Proposal` is qualified.
 *
 * @param proposal Checked `Proposal`.
 * @returns Whether `proposal` is qualified.
 */
export function isProposalQualified(proposal: Proposal): boolean {
    return isTokenExprQualified(proposal.want)
        && isTokenExprQualified(proposal.give);
}