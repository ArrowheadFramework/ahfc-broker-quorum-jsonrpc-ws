import { isTokenQualified, Token } from ".";

/**
 * A logical expression of `Tokens`, useful for expressing conditional `Token`
 * interest.
 */
export type TokenExpr = Token | TokenNOT | TokenAND | TokenIOR | TokenXOR;

/**
 * The logical inverse of its contents.
 */
export interface TokenNOT {
    kind: "__not",
    item: TokenExpr,
}

/**
 * A set of alternatives where _all_ `TokenExprs` must be chosen.
 */
export interface TokenAND {
    kind: "__and",
    items: TokenExpr[];
}

/**
 * A set of alternatives where _at least one_ `TokenExpr` must be chosen.
 */
export interface TokenIOR {
    kind: "__ior",
    items: TokenExpr[];
}

/**
 * A set of alternatives where _exactly one_ `TokenExpr` must be chosen.
 */
export interface TokenXOR {
    kind: "__xor",
    items: TokenExpr[];
}

/**
 * Checks whether given `expr` represent a single `Token`.
 * 
 * @param expr Checked `TokenExpr`.
 * @returns Whether given `TokenExpr` is of type `Token`.
 */
export function isToken(expr: TokenExpr): expr is Token {
    return !expr.kind.startsWith("__");
}

/**
 * Checks whether given `expr` is a `Token` NOT expression.
 * 
 * @param expr Checked `TokenExpr`.
 * @returns Whether given `TokenExpr` is of type `TokenNOT`.
 */
export function isTokenNOT(expr: TokenExpr): expr is TokenNOT {
    return expr.kind === "__not";
}

/**
 * Checks whether given `expr` is a `Token` AND expression.
 * 
 * @param expr Checked `TokenExpr`.
 * @returns Whether given `TokenExpr` is of type `TokenAND`.
 */
export function isTokenAND(expr: TokenExpr): expr is TokenAND {
    return expr.kind === "__and";
}

/**
 * Checks whether given `expr` is a `Token` IOR expression.
 *
 * @param expr Checked `TokenExpr`.
 * @returns Whether given `TokenExpr` is of type `TokenIOR`.
 */
export function isTokenIOR(expr: TokenExpr): expr is TokenIOR {
    return expr.kind === "__ior";
}

/**
 * Checks whether given `expr` is a `Token` XOR expression.
 *
 * @param expr Checked `TokenExpr`.
 * @returns Whether given `TokenExpr` is of type `TokenXOR`.
 */
export function isTokenXOR(expr: TokenExpr): expr is TokenXOR {
    return expr.kind === "__xor";
}

/**
 * Checks whether given `expr` represent a _qualified_ `Token` expression.
 *
 * @param expr Checked `TokenExpr`.
 * @returns Whether given `TokenExpr` is qualified.
 */
export function isTokenExprQualified(expr: TokenExpr): boolean {
    if (isToken(expr)) {
        return isTokenQualified(expr);
    }
    if (isTokenAND(expr)) {
        return expr.items.every(t => isTokenExprQualified(t));
    }
    return false;
}

/**
 * Checks whether given `expr` represent a _valid_ `Token` expression.
 *
 * @param expr Checked `TokenExpr`.
 * @returns Whether given `TokenExpr` is valid.
 */
export function isTokenExprSatisfiable(expr: TokenExpr): boolean {
    const tokens: Token[] = [];

    
    return true; // TODO (see https://github.com/cemulate/SAT.js)
/*
    function normalize(expr: TokenExpr) {
        if (isToken(expr)) {
            tokens.push(expr);
            return;
        }
        if (isTokenNOT(expr)) {
            findTokens(expr.item);
            return;
        }
        for (const item of expr.items) {
            findTokens(item);
        }
    }*/
}