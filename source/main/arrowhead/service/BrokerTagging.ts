import * as model from "../model";

/**
 * A service associating `Exchange`s and `Token`s with private metadata.
 *
 * # Private
 *
 * Tags are _private_ in the sense that they are not made known outside the
 * local cloud of a given Broker. This means that they cannot be seen or known
 * to exist by parties using the same trading platform via a different Broker
 * in a different cloud. `Tag`s can be seen, however, by other services allowed
 * to access the `BrokerTagging` service in the same local cloud.
 *
 * `Tag`s are suitable for keeping track of plant-specific data, such as
 * internal reference numbers, order identifiers, task assignments, etc. They
 * should not be used for highly sensitive information, unless measures are
 * taken to protect it through encryption or otherwise.
 */
export interface BrokerTagging {
    /**
     * Queries for `Exchange` `Tag`s.
     *
     * @param query Specification of what `Exchange` `Tag`s to acquire.
     * @returns Promise of any `Exchange` `Tag`s matching the given `TagQuery`.
     */
    getExchangeTags(query: model.TagQuery): Promise<model.TagResultSet>;

    /**
     * Queries for `Token` `Tag`s.
     *
     * @param query Specification of what `TokenTag`s to acquire.
     * @returns Promise of any `Token` `Tag`s matching the given `TagQuery`.
     */
    getTokenTags(query: model.TagQuery): Promise<model.TagResultSet>;

    /**
     * Saves given `Exchange` `Tag`, potentially replacing any previous such
     * with the same `tag.id` or `tag.kind` and `tag.subjectId`.
     *
     * @param tag `Exchange` `Tag` to insert.
     * @returns Promise of inserted `Exchange` `Tag` identifier.
     */
    putExchangeTag(tag: model.Tag): Promise<string>;

    /**
     * Saves given `Token` `Tag`, potentially replacing any previous such with
     * the same `tag.id` or `tag.kind` and `tag.subjectId`.
     *
     * @param tag `Token` `Tag` to insert.
     * @returns Promise of inserted `Token` `Tag` identifier.
     */
    putTokenTag(tag: model.Tag): Promise<string>;
}