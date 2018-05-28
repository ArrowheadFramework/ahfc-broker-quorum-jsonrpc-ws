import { isTokenExprSatisfiable, isTokenExprQualified, TokenExpr } from ".";

/**
 * A `Token` exchange proposal.
 */
export interface Proposal {
    /**
     * The moment in time when this `Proposal` becomes acceptable.
     */
    baseline?: Date,

    /**
     * The moment in time when this `Proposal` ceases to be acceptable.
     */
    deadline?: Date,

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
    return isProposalTimely(proposal, fudgeInMs)
        && isProposalQualified(proposal)
        && isProposalSatisfiable(proposal);
}

/**
 * Checks whether given `Proposal` can be rejected.
 *
 * All acceptable proposals can be rejected, but only rejectable proposals with
 * a passed baseline can be accepted.
 *
 * @param proposal Checked `Proposal`.
 * @param fudgeInMs Permitted error when comparing current time to `Proposal`
 *                  `baseline` and `deadline`. Defaults to 300 ms.
 * @returns Whether `proposal` is acceptable.
 */
export function isProposalRejectable(proposal: Proposal, fudgeInMs = 300) {
    const now = Date.now();
    if (proposal.deadline && now >= (proposal.deadline.getTime() + fudgeInMs)) {
        return false;
    }
    return isProposalQualified(proposal)
        && isProposalSatisfiable(proposal);
}

/**
 * Checks whether given `Proposal` is timely, meaning the current time is after
 * its `baseline` and before its `deadline`.
 *
 * @param proposal Checked `Proposal`.
 * @param fudgeInMs Permitted error when comparing current time to `Proposal`
 *                  `baseline` and `deadline`. Defaults to 300 ms.
 * @returns Whether `proposal` is timely.
 */
export function isProposalTimely(proposal: Proposal, fudgeInMs = 300) {
    const now = Date.now();
    return proposal.baseline && now >= (proposal.baseline.getTime() - fudgeInMs)
        && proposal.deadline && now < (proposal.deadline.getTime() + fudgeInMs);
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

/**
 * Checks whether given `Proposal` is satisfiable.
 *
 * @param proposal Checked `Proposal`
 * @returns Whether `proposal` is valid.
 */
export function isProposalSatisfiable(proposal: Proposal): boolean {
    if (proposal.baseline && proposal.deadline) {
        if (proposal.baseline > proposal.deadline) {
            return false;
        }
    }
    return isTokenExprSatisfiable(proposal.want)
        && isTokenExprSatisfiable(proposal.give);
}