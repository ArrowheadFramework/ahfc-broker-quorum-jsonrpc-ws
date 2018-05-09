import { Query } from ".";

/**
 * A set of `items` matching some original `Query`.
 */
export interface ResultSet<Item> extends Query {
    /**
     * An `Array` of the items matching an original query. May be empty.
     */
    items: Item[];
}