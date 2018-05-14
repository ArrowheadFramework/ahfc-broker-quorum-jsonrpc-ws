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
 * Checks whether given `expr` is a _satisfiable_ `Token` expression.
 *
 * The Boolean satisfiability problem is NP hard, and this function uses a
 * rather naive approach to checking whether given expressions are indeed
 * satisfiable. This means that performance will degrade quickly for larger
 * token expressions. If performance would be very important, then there is
 * likely plenty of room for improving this implementation. Also, the
 * application could be made to simply reject larger expressions without
 * checking them.
 *
 * @param expr Checked `TokenExpr`.
 * @returns Whether given `TokenExpr` is satisfiable.
 */
export function isTokenExprSatisfiable(expr: TokenExpr): boolean {
    const registry = { count: 0, nameToId: new Map<string, number>() };
    const pef = intoPEF(expr, registry);
    const nnf = intoNNF(pef);
    const cnf = intoCNF(nnf);
    return solveCNF(cnf, registry.count);

    // TokenExpr into Predicate Expression Form (PEF).
    //
    // The function transforms the token expression into a simpler nested data
    // structure, where tokens are replaced with positive integers (>0)
    // referred to as literals.
    function intoPEF(expr, registry) {
        if (isToken(expr)) {
            let name = expr.kind.replace(/([.:])/, "\\$1");
            if (expr.id !== undefined) {
                name += "." + expr.id;
            } else {
                // Each `Token` without an `id` is considered a unique variable.
                name += ":" + registry.count;
            }
            let id = registry.nameToId.get(name);
            if (id === undefined) {
                id = ++registry.count;
                registry.nameToId.set(name, id);
            }
            return id;
        }
        if (isTokenNOT(expr)) {
            return [expr.kind, intoPEF(expr.item, registry)];
        }
        return [expr.kind, expr.items.map(item => intoPEF(item, registry))];
    }

    // PEF into Negation Normal Form (NNF).
    //
    // Removes NOT expressions by transforming AND and IOR expressions and
    // negating relevant literals. Substitutes XOR expressions with equivalent
    // such that use only IOR, NOT and AND constructs. Finally, replaces the
    // expression identifiers with "&" (AND) and "|" (OR), for the sake of
    // brevity.
    //
    // See: https://en.wikipedia.org/wiki/Conjunctive_normal_form
    function intoNNF(pef, neg = false) {
        if (typeof pef === "number") {
            return neg ? -pef : pef;
        }
        switch (pef[0]) {
            case "__not":
                return intoNNF(pef[1], !neg);

            case "__and":
                return [neg ? "|" : "&", pef[1]
                    .map(item => intoNNF(item, neg))];

            case "__ior":
                return [neg ? "&" : "|", pef[1]
                    .map(item => intoNNF(item, neg))];

            case "__xor":
                return intoNNF(["__and", [
                    ["__ior", pef[1]],
                    ["__not", ["__and", pef[1]]]]], neg);

            default:
                throw new Error("Unreachable!");
        }
    }

    // NNF into Conjunctive Normal Form (CNF).
    //
    // Flattens the given NNF expression by merging nested ANDs and ORs, as well
    // as by distributing ORs inwards over ANDs (P OR (Q AND R) ->
    // (P OR Q) AND (P OR R)). Finally, normalizes the resulting expression to
    // make it consumable by the solveCNF() function.
    //
    // See: https://en.wikipedia.org/wiki/Conjunctive_normal_form
    function intoCNF(nnf) {
        return normalize(flatten(nnf));

        function flatten(nnf) {
            if (isLiteral(nnf)) {
                return nnf;
            }
            const [kind, items] = nnf;
            switch (kind) {
                case "&":
                    return ["&", items.reduce((result, item) => {
                        item = flatten(item);
                        return result.concat(isAND(item) ? item[1] : [item]);
                    }, [])];

                case "|":
                    if (items.length === 1) {
                        return flatten(items[0]);
                    }
                    for (let i = 0; i < items.length; ++i) {
                        const item = items[i];
                        if (isAND(item)) {
                            const transform = (i === 0)
                                ? distribute(items[1], item[1], items.slice(2))
                                : distribute(items[0], item[1], [
                                    ...items.slice(1, i),
                                    ...items.slice(i + 1),
                                ]);
                            return flatten(transform);
                        }
                    }
                    return ["|", items.map(item => {
                        return isLiteral(item) ? item : flatten(item[1]);
                    })];

                default:
                    throw new Error("Unreachable!");
            }
        }

        function distribute(p, Q, T) {
            const [q, r, ...S] = Q;
            let transform = ["&", [["|", p, q], ["|", p, r], ...S]];
            if (T.length > 0) {
                transform = ["|", transform, ...T];
            }
            return transform;
        }

        function isLiteral(x) {
            return typeof x === "number";
        }

        function isAND(x) {
            return Array.isArray(x) && x[0] === "&";
        }

        function isOR(x) {
            return Array.isArray(x) && x[0] === "|";
        }

        function normalize(root) {
            if (isLiteral(root)) {
                return [[root]];
            }
            if (isOR(root)) {
                return [root[1]];
            }
            return root[1].map(clause => Array.isArray(clause)
                ? clause[1]
                : [clause]);
        }
    }

    // Solve CNF clauses, which refer to n different variables.
    //
    // Performs a recursive binary tree search of all variable combinations.
    // Could be improved in many ways for improved performance.
    function solveCNF(clauses, n) {
        if (n < 1) {
            return true;
        }
        return branch(new Array(n), 0, clauses);

        function branch(variables, offset, clauses) {
            if (variables.length <= offset) {
                return true;
            }
            variables[offset] = true;
            if (evaluate(variables, offset + 1, clauses)) {
                return true;
            }
            variables[offset] = false;
            return evaluate(variables, offset + 1, clauses);
        }

        function evaluate(variables, offset, clauses) {
            outer: for (const clause of clauses) {
                for (const literal of clause) {
                    if (isTrueOrUnset(variables, offset, literal)) {
                        continue outer;
                    }
                }
                return false;
            }
            return branch(variables, offset, clauses);
        }

        function isTrueOrUnset(variables, offset, literal) {
            return literal > offset
                || literal > 0 && variables[literal - 1]
                || literal < 0 && !variables[-literal - 1];
        }
    }
}