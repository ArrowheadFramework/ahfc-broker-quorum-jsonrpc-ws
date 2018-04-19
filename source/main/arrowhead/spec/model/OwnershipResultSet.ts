import { Ownership, OwnershipQuery, ResultSet } from ".";

/**
 * `Ownership`s retrieved in response to some `OwnershipQuery`.
 */
export interface OwnershipResultSet
    extends OwnershipQuery, ResultSet<Ownership> { }