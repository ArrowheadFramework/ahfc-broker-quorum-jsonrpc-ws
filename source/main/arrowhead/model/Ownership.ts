import * as model from ".";

/**
 * Specifies what `Token`s are owned by a `Party`.
 */
export interface Ownership {
    /**
     * The owning `Party`.
     */
    party: model.Party;

    /**
     * The `id` each `Token` owned by `party`. 
     */
    tokenIds: string[];
}