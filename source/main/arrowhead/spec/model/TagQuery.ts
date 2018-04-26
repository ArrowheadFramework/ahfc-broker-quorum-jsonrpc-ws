import { Query } from ".";

/**
 * Specifies properties of a desired set of `Tag`s.
 */
export interface TagQuery extends Query {
    /**
     * Limits requested `Tag`s to those with an `id` matching any one of those
     * given.
     */
    ids?: string[];

    /**
     * Limits requested `Tag`s to those with a `subjectId` matching any one of
     * those given.
     */
    subjectIds?: string[];

    /**
     * Limites requested `Tag`s to those with a `kind` matching the one given.
     */
    kind?: string;
}