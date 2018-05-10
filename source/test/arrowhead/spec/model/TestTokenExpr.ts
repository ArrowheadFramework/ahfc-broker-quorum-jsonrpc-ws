import * as model from "../../../../main/arrowhead/spec/model";
import * as unit from "../../../unit";

export class TestTokenExpr implements unit.Suite {
    public readonly name: string = "TokenExpr";

    units: unit.Unit[] = [
        {
            name: "Satisfiability",
            test(recorder: unit.Recorder) {
                const pairs = [
                    // Token.
                    [1, t("A")],
                    [1, t("A", "1")],

                    // TokenAND.
                    [1, and(t("A"))],
                    [1, and(t("A", "1"))],
                    [1, and(t("A", "1"), t("A"))],
                    [1, and(t("A", "1"), t("A", "1"))],
                    [0, and(t("A", "1"), not(t("A", "1")))],                    

                    // TokenIOR.
                    [1, ior(t("A"))],
                    [1, ior(t("A"), t("A"))],
                    [1, ior(t("A"), t("B"))],
                    [1, and(ior(t("A"), t("B")), not(t("B")))],
                    [1, and(ior(t("A"), t("B"), t("C")), t("A"), t("B"))],
                    [0, and(ior(t("A"), t("B")), not(and(t("A"), t("B"))))],                                        

                    // TokenXOR.
                    [1, xor(t("A"))],
                    [1, xor(t("A"), t("B"))],
                    [1, and(xor(t("A"), t("B")), not(t("B")))],
                    [0, and(xor(t("A"), t("B"), t("C")), t("A"), t("B"))],
                    [0, and(xor(t("A"), t("B")), not(t("A")), not(t("B")))],
                ];

                for (const pair of pairs) {
                    const expected = pair[0] === 1;
                    const expr = pair[1] as model.TokenExpr;
                    if (model.isTokenExprSatisfiable(expr) !== expected) {
                        recorder.fail((expected
                            ? "Expression not satisfiable: "
                            : "Expression satisfiable: ")
                            + JSON.stringify(expr));
                        return;
                    }
                }
            }
        }
    ];
}

function t(kind: string, id?: string): model.Token {
    return { id, kind };
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