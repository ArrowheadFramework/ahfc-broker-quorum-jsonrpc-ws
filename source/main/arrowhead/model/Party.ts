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
export interface PartyALL {}

/**
 * An array of `Party` objects.
 */
export interface PartyLIST {
    /**
     * Included `PartySet`s.
     */
    parties: Party[];
}

/**
 * Represents any kind of `Party` object set.
 */
export type PartySet = Party | PartyALL | PartyLIST;

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
export function isPartyALL(set: PartySet): set is PartyALL {
    return set === null || set === undefined ||
        set["key"] === undefined && set["parties"] === undefined;
}

/**
 * Checks whether given `parties` represents a list of included `Party`
 * instances.
 * 
 * @param parties Checked `PartySet`.
 * @returns Whether given `PartySet` is of type `PartyLIST`.
 */
export function isPartyLIST(set: PartySet): set is PartyLIST {
    return (<PartyLIST>set).parties !== undefined;
}
