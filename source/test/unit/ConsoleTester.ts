import { Recorder, Suite, Tester, Unit } from "./index";

/**
 * Unit tester that writes test results to console.
 */
export class ConsoleTester implements Tester {
    private readonly suites: Suite[];
    private readonly verbose: boolean;

    /**
     * Creates new console tester.
     * 
     * @param options Instance options.
     */
    public constructor(options: ConsoleTesterOptions = {}) {
        this.suites = [];
        this.verbose = options.verbose || false;
    }

    public register(suite: Suite): this {
        this.suites.push(suite);
        return this;
    }

    public run(): Promise<number> {
        let failCount = 0;
        let passCount = 0;
        let skipCount = 0;

        const executeUnit = (
            suite: Suite,
            unit: Unit,
            extras: any[]
        ): Promise<void> => new Promise(resolve => {
            let completed = false;
            let timeout;

            const tryComplete = (): boolean => {
                if (!completed) {
                    completed = true;
                    if (timeout) {
                        clearTimeout(timeout);
                    }
                    resolve();
                    return true;
                }
                return false;
            }

            const logPrefix = this.verbose ? "  - " : "";
            const logSuite = this.verbose
                ? ""
                : (suite.name + " > ");

            const fail = (reason?: any) => {
                if (tryComplete()) {
                    console.log(logPrefix + "FAIL " + logSuite + unit.name +
                        (reason ? (": " + reason) : "")
                    );
                    failCount += 1;
                }
            };
            const pass = (reason?: any) => {
                if (tryComplete()) {
                    if (this.verbose) {
                        console.log(logPrefix + "PASS " + logSuite + unit.name +
                            (reason ? (": " + reason) : "")
                        );
                    }
                    passCount += 1;
                }
            };
            const skip = (reason?: any) => {
                if (tryComplete()) {
                    console.log(logPrefix + "SKIP " + logSuite + unit.name +
                        (reason ? (": " + reason) : "")
                    );
                    skipCount += 1;
                }
            };

            if (unit.timeoutInMs) {
                timeout = setTimeout(() =>
                    fail("Timed out after " +
                        unit.timeoutInMs + " ms."),
                    unit.timeoutInMs
                );
            }
            try {
                unit.test({ fail, pass, skip }, ...extras);
                if (!unit.timeoutInMs) {
                    pass();
                }
            } catch (error) {
                fail(error);
            }
        });

        const executeSuite = (suite: Suite) => new Promise(resolve => {
            if (this.verbose) {
                console.log();
                console.log("> " + suite.name);
            }

            let before: Promise<any[]>;
            if (suite.setup) {
                let extras = suite.setup();
                before = (extras instanceof Promise)
                    ? extras
                    : Promise.resolve(extras);
            } else {
                before = Promise.resolve([]);
            }

            before.then(extras => Promise
                .all(suite.units.map(unit => executeUnit(suite, unit, extras)))
                .then(() => {
                    if (suite.teardown) {
                        let promise = suite.teardown(...extras);
                        if (promise instanceof Promise) {
                            promise.then(() => resolve());
                            return;
                        }
                    }
                    resolve();
                }));
        });

        const suites = this.suites
            .slice()
            .sort((a, b) => b.name.localeCompare(a.name));

        if (this.verbose) {
            console.log("> Running unit tests ...");
        }

        return new Promise(resolve => {
            const nextSuite = () => {
                if (suites.length === 0) {
                    if (failCount > 0 || skipCount > 0 || this.verbose) {
                        console.log();
                        console.log("> Test Results");
                        console.log("  - Failed units:  " + failCount);
                        console.log("  - Passed units:  " + passCount);
                        console.log("  - Skipped units: " + skipCount);
                        console.log();
                    } else {
                        console.log("All " + passCount + " tests passed.")
                    }
                    resolve();
                } else {
                    executeSuite(suites.pop()).then(() => nextSuite());
                }
            };
            nextSuite();
        });
    }
}

export interface ConsoleTesterOptions {
    /**
     * Whether or not console output is to include additional details.
     */
    verbose?: boolean,
}