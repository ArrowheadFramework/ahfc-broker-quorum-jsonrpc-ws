import { TokenExpr } from ".";

/**
 * A declaration of what `Proposals` are of interest to some `Party`.
 */
export interface ProposalFilter {
    /**
     * If given, no `Proposals` are desired from identified parties.
     */
    blacklist?: Buffer[];

    /**
     * If given, `Proposals` are only desired from identified Parties, unless in
     * `blacklist`.
     */
    whitelist?: Buffer[];

    /**
     * If given, only `Proposals` offering matching `Tokens` are desired.
     */
    want?: TokenExpr;
}