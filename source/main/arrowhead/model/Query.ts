/**
 * Specifies properties of a desired set of items.
 *
 * # Undefined Implies All
 *
 * A `Query` is essentially a set of properties that may or may not be specified
 * in order to limit the size of a result set. Properties that are not specified
 * ought to be understood as if a certain restriction has _not_ been imposed,
 * implying that there should be no reduction in result set size. If, for
 * example, no `offset` is specified, it must be understood as being `0`, as
 * that is the only way for the property to not reduce the size of a
 * corresponding `ResultSet`.
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
