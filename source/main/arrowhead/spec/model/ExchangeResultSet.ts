import { Exchange, ExchangeQuery, ResultSet } from ".";

/**
 * `Exchange`s retrieved in response to some `ExchangeQuery`.
 */
export interface ExchangeResultSet
    extends ExchangeQuery, ResultSet<Exchange> { }