/**
 * A specification of a desired set of `items`.
 */
export interface Query {
    /**
     * Number of items to exclude from the result, from the beginning of the
     * full sequence of items matching any other query criteria.
     */
    offset?: number;

    /**
     * The maximum number of items to include in the result.
     */
    limit?: number;
}
