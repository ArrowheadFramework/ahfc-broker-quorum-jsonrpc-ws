import { Party } from ".";

/**
 * Specifies that one particular `Token` is owned by a `Party`.
 */
export interface Ownership {
    /**
     * The owning `Party`.
     */
    party: Party;

    /**
     * The `id` of one `Token` owned by `party`.
     */
    tokenId: string;
}