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
     * Queries for `ExchangeTag`s.
     *
     * @param query Specification of what `ExchangeTag`s to acquire.
     * @returns Promise of any `ExchangeTag`s matching the given
     *          `ExchangeTagQuery`.
     */
    getExchangeTags(query: ExchangeTagQuery): Promise<ExchangeTagResultSet>;

    /**
     * Queries for `TokenTag`s.
     *
     * @param query Specification of what `TokenTag`s to acquire.
     * @returns Promise of any `TokenTag`s matching the given `TokenTagQuery`.
     */
    getTokenTags(query: TokenTagQuery): Promise<TokenTagResultSet>;

    /**
     * Saves given `ExchangeTag`, potentially replacing any previous such with
     * the same `tag.id` or `tag.kind` and `tag.exchangeId`.
     *
     * @param tag `ExchangeTag` to insert.
     * @returns Promise of inserted `ExchangeTag` identifier.
     */
    putExchangeTag(tag: ExchangeTag): Promise<string>;

    /**
     * Saves given `TokenTag`, potentially replacing any previous such with
     * the same `tag.id` or `tag.kind` and `tag.tokenId`.
     *
     * @param tag `TokenTag` to insert.
     * @returns Promise of inserted `TokenTag` identifier.
     */
    putTokenTag(tag: TokenTag): Promise<string>;
}

/**
 * Arbitrary `data` associated with some other _Broker_ data entry.
 */
export interface Tag {
    /**
     * String uniquely identifying this `Tag`.
     */
    id?: string;

    /**
     * Arbitrary string classifying the contents of this `Tag`.
     */
    kind: string;

    /**
     * Arbitrary metadata associated with a tagged data entry.
     */
    data: any;
}

/**
 * Specifies properties of a desired set of `Tag`s.
 */
export interface TagQuery extends model.Query {
    /**
     * Limits requested `Tag`s to those with an `id` matching any one of those
     * given.
     */
    ids?: string[];

    /**
     * Limites requested `Tag`s to those with a `kind` matching the one given.
     */
    kind?: any;
}

/**
 * Arbitrary `data` associated with some `Exchange`.
 */
export interface ExchangeTag extends Tag {
    /**
     * String identifying the tagged `Exchange`.
     */
    exchangeId: string;
}

/**
 * Specifies properties of a desired set of `ExchangeTag`s.
 */
export interface ExchangeTagQuery extends TagQuery {
    /**
     * Limits requested `ExchangeTag`s to those with an `exchangeId` matching
     * any one of those given.
     */
    exchangeIds?: string[];
}

/**
 * `ExchangeTag`s retrieved in response to some `ExchangeTagQuery`.
 */
export interface ExchangeTagResultSet
    extends ExchangeTagQuery, model.ResultSet<ExchangeTag> { }

/**
 * Arbitrary `data` associated with some `Token`.
 */
export interface TokenTag extends Tag {
    /**
     * String identifying the tagged `Token`.
     */
    tokenId: string;
}

/**
 * Specifies properties of a desired set of `TokenTag`s.
 */
export interface TokenTagQuery extends TagQuery {
    /**
     * Limits requested `TokenTag`s to those with an `tokenId` matching any one
     * of those given.
     */
    tokenIds?: string[];
}

/**
 * `TokenTag`s retrieved in response to some `TokenTagQuery`.
 */
export interface TokenTagResultSet
    extends TokenTagQuery, model.ResultSet<TokenTag> { }