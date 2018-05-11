import * as model from "../../../../main/arrowhead/spec/model";
import * as unit from "../../../unit";
import * as util from "util";

export class TestTokenExpr implements unit.Suite {
    public readonly name: string = "TokenExpr";

    units: unit.Unit[] = [
        {
            name: "Satisfiability",
            test(recorder: unit.Recorder) {
                const pairs = [
                    // Token.
                    [1, t("A")],
                    [1, t("A1")],
                    [1, not(t("A1"))],
                    [1, not(not(t("A1")))],

                    // TokenAND.
                    [1, and()],
                    [1, and(t("A"))],
                    [1, and(t("A1"))],
                    [1, and(t("A1"), t("A"))],
                    [1, and(t("A1"), t("A1"))],
                    [0, and(t("A1"), not(t("A1")))],
                    [1, and(t("A"), not(t("A")))],
                    [1, and(t("A1"), not(not(t("A1"))))],

                    // TokenIOR.
                    [1, ior()],
                    [1, ior(t("A1"))],
                    [1, ior(t("A1"), t("A1"))],
                    [1, ior(t("A1"), t("B1"))],
                    [1, and(ior(t("A1"), t("B1")), not(t("B1")))],
                    [1, and(ior(t("A1"), t("B1"), t("C1")), t("A1"), t("B1"))],
                    [1, and(ior(t("A1"), t("B1")), not(and(t("A1"), t("B1"))))],

                    // TokenXOR.
                    [1, xor()],
                    [0, xor(t("A1"))],
                    [1, xor(t("A1"), t("B1"))],
                    [1, and(xor(t("A1"), t("B1")), not(t("B1")))],
                    [1, and(xor(t("A1"), t("B1"), t("C1")), t("A1"), t("B1"))],
                    [0, and(xor(t("A1"), t("B1")), not(t("A1")), not(t("B1")))],
                ];

                for (const pair of pairs) {
                    const isSatisfiable = pair[0] === 1;
                    const expr = pair[1] as model.TokenExpr;
                    if (model.isTokenExprSatisfiable(expr) !== isSatisfiable) {
                        recorder.fail((isSatisfiable
                            ? "Expression should be satisfiable: "
                            : "Expression should not be satisfiable: ")
                            + util.inspect(expr, { colors: true, depth: 100 }));
                        return;
                    }
                }
            }
        }
    ];
}

function t(kindId: string): model.Token {
    return { id: kindId[1] || undefined, kind: kindId[0] };
}

function not(expr: model.TokenExpr): model.TokenNOT {
    return { kind: "__not", item: expr };
}

function and(...exprs: model.TokenExpr[]): model.TokenAND {
    return { kind: "__and", items: exprs };
}

function ior(...exprs: model.TokenExpr[]): model.TokenIOR {
    return { kind: "__ior", items: exprs };
}

function xor(...exprs: model.TokenExpr[]): model.TokenXOR {
    return { kind: "__xor", items: exprs };
}