import { Party, PartyQuery, ResultSet } from ".";

/**
 * `Party`s retrieved in response to some `PartyQuery`.
 */
export interface PartyResultSet
    extends PartyQuery, ResultSet<Party> { }