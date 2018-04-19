import { ResultSet, Token, TokenQuery } from ".";

/**
 * `Token`s retrieved in response to some `TokenQuery`.
 */
export interface TokenResultSet
    extends TokenQuery, ResultSet<Token> { }