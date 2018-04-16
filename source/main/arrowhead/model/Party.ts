/**
 * Represents the identity of a single party.
 */
export interface Party {
    /**
     * Public key representing party.
     */
    key: Buffer;
}

/**
 * The set of all parties.
 */
export interface PartyAll {}

/**
 * An array of `Party` objects.
 */
export interface PartyArray {
    parties: Party[];
}

/**
 * Represents any kind of `Party` object set.
 */
export type PartySet = Party | PartyAll | PartyArray;

/**
 * Checks whether given `parties` represents a single `Party`.
 * 
 * @param set Checked `PartySet`.
 * @returns Whether given `PartySet` is of type `Party`.
 */
export function isParty(set: PartySet): set is Party {
    return (<Party>set).key !== undefined; 
}

/**
 * Checks whether given `parties` represents all relevant `Party` instances.
 * 
 * @param set Checked `PartySet`.
 * @returns Whether given `PartySet` is of type `PartyALL`.
 */
export function isPartyAll(set: PartySet): set is PartyAll {
    return set === null || set === undefined ||
        set["key"] === undefined && set["parties"] === undefined;
}

/**
 * Checks whether given `parties` represents an array of included `Party`
 * instances.
 * 
 * @param parties Checked `PartySet`.
 * @returns Whether given `PartySet` is of type `PartyLIST`.
 */
export function isPartyArray(set: PartySet): set is PartyArray {
    return (<PartyArray>set).parties !== undefined;
}
