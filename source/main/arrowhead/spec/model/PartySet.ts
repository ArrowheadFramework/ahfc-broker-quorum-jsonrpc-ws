import { Party } from ".";

/**
 * A set of `Party` objects.
 */
export type PartySet = Party | PartyAll | PartyArray;

/**
 * The set of all parties.
 */
export type PartyAll = null;

/**
 * An array of `Party` objects.
 */
export type PartyArray = Party[];

/**
 * Checks whether given `parties` represents a single `Party`.
 * 
 * @param set Checked `PartySet`.
 * @returns Whether given `PartySet` is of type `Party`.
 */
export function isParty(set: PartySet): set is Party {
    return typeof set === "object" && (<Party>set).key !== undefined;
}

/**
 * Checks whether given `parties` represents all relevant `Party` objects.
 * 
 * @param set Checked `PartySet`.
 * @returns Whether given `PartySet` is of type `PartyAll`.
 */
export function isPartyAll(set: PartySet): set is PartyAll {
    return set === null;
}

/**
 * Checks whether given `parties` represents an array of `Party` objects.
 * 
 * @param parties Checked `PartySet`.
 * @returns Whether given `PartySet` is of type `PartyArray`.
 */
export function isPartyArray(set: PartySet): set is PartyArray {
    return Array.isArray(set);
}

/**
 * @returns A value representing all relevant `Party` objects.
 */
export function partyAll(): PartyAll {
    return null;
}
