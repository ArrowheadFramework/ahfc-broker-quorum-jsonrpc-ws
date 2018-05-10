import * as arrowhead from "./arrowhead";
import * as unit from "./unit";

new unit.ConsoleTester({ verbose: true })
    .register(new arrowhead.TestTokenExpr())
    .run()
    .then(status => process.exit(status));