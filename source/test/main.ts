import * as unit from "./unit";

new unit.ConsoleTester({ verbose: false })
    //.register(someSuiteToRun)
    .run()
    .then(status => process.exit(status));