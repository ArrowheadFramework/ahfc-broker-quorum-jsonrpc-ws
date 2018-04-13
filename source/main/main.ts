import * as process from "process";

/**
 * Application main class.
 */
class Application {
    /**
     * Creates new application.
     * 
     * @param argv Application command line arguments.
     */
    constructor(argv = process.argv.slice(2)) {
        console.log("+ Argv: " + argv);
    }

    /**
     * Application start routine.
     */
    public async start() {
        console.log("+ Start.");
    }

    /**
     * Application exit routine.
     */
    public async exit() {
        console.log("+ Exit.");
    }
}

// Bootstrap.
{
    const application = new Application();

    let didExit = false;
    const onExit = () => {
        if (didExit) {
            return;
        }
        didExit = true;
        console.log();
        application.exit()
            .then(() => process.exit(0))
            .catch(error => {
                console.log("Orderly exit failed.");
                console.log("Reason:");
                console.log(error);
                process.exit(2);
            });
    }

    process.on("SIGINT", onExit);
    process.on("SIGTERM", onExit);
    process.on("SIGHUP", onExit);

    application.start()
        .catch(error => {
            console.log("System start failed.");
            console.log("Reason:");
            console.log(error);
            process.exit(1);
        });
}