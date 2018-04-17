import { ResultSet, Tag, TagQuery } from ".";

/**
 * `ExchangeTag`s retrieved in response to some `ExchangeTagQuery`.
 */
export interface TagResultSet
    extends TagQuery, ResultSet<Tag> { }