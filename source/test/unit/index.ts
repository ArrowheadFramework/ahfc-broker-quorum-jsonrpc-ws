export * from "./ConsoleTester";

/**
 * An object used to track unit test results.
 */
export interface Recorder {
    /**
     * Records that given unit was failed.
     * 
     * Note that unit execution continues after this method has been called. It
     * is the responsibility of the caller to ensure that no other recorder
     * methods are called from the same unit.
     * 
     * @param reason Description of why unit was failed.
     */
    fail(reason?: any);

    /**
     * Records that given unit was passed.
     * 
     * Note that unit execution continues after this method has been called. It
     * is the responsibility of the caller to ensure that no other recorder
     * methods are called from the same unit.
     * 
     * @param reason Description of why unit was passed.
     */
    pass(reason?: any);

    /**
     * Records that given unit was skipped.
     * 
     * Note that unit execution continues after this method has been called. It
     * is the responsibility of the caller to ensure that no other recorder
     * methods are called from the same unit.
     * 
     * @param reason Description of why unit was skipped.
     */
    skip(reason?: any);
}

/**
 * A unit test.
 */
export interface Unit {
    /**
     * Name of unit.
     */
    name: string;

    /**
     * Time after which unit is failed unless `recorder.pass()` has been called.
     * 
     * If not specified, then the unit is passed if no test state is recorded
     * before the unit function completes.
     */
    timeoutInMs?: number;

    /**
     * Executes unit test function.
     * 
     * An exception being thrown during test execution is the same as if
     * `recorder.fail()` was called with that exception.
     * 
     * @param recorder Recorder to capture unit results.
     * @param extras Additional arguments optionally provided by owning suite.
     */
    test(recorder: Recorder, ...extras: any[]);
}

/**
 * A suite of related unit tests.
 */
export interface Suite {
    /**
     * Name of suite.
     */
    name: string;

    /**
     * Function called before suite units.
     *
     * Any returned values are provided to all suite units on execution.
     */
    setup?: () => PromiseLike<any[]> | any[];

    /**
     * Function called after suite units.
     *
     * The function is provided with any values returned by `before`, if set.
     */
    teardown?: (...extras: any[]) => PromiseLike<void> | void;

    /**
     * Units of suite.
     */
    units: Unit[];
}

/**
 * Maintains a list of unit test suites.
 */
export interface Tester {
    /**
     * Adds unit test suite to tester.
     * 
     * @param suite Suite to register.
     */
    register(suite: Suite): this;

    /**
     * Executes each test in each unit.
     * 
     * @return Zero (0) if all tests pass, one (1) in any other case.
     */
    run(): Promise<number>;
}