import * as model from ".";

/**
 * A set of `items` matching some original `Query`.
 *
 * # Truncation
 *
 * The receiver of a `Query` is allowed to truncate the set of `items` in its
 * result. If, however, this is done, it must be reflected in the `limit` field
 * in the `ResultSet`.
 *
 * # Offset out of Bounds
 *
 * If the `offset` of a `Query` exceeds the number of matching items, the
 * `Query` receiver __must__ reduce the `offset` in the `ResultSet` to the
 * number of matching items, set `limit` to `0` and provide `items` as an empty
 * `Array`.
 */
export interface ResultSet<T> extends model.Query {
    /**
     * An `Array` of the items matching an original query. May be empty.
     */
    items: T[];
}