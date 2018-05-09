/**
 * A general query for some desired set of items.
 */
export interface Query {
    /**
     * If given, skip `offset` items from beginning of result set before
     * applying any limit.
     */
    offset?: number;

    /**
     * If given, include no more than `limit` items in result set.
     */
    limit?: number;
}
