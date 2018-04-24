import * as arrowhead from "./arrowhead";
import * as process from "process";
import * as log from "./util/log";

/**
 * Application main class.
 */
class Application {
    private readonly broker: arrowhead.Broker;
    private readonly logger: log.Logger;

    /**
     * Creates new application.
     * 
     * @param argv Application command line arguments.
     */
    constructor(argv = process.argv.slice(2)) {
        this.logger = new log.ConsoleLogger();
        this.broker = new arrowhead.Broker(this.logger);
    }

    /**
     * Application start routine.
     */
    public async start() {
        this.logger.info("Starting ...");
        await this.broker.start();
        this.logger.info("Started.")
    }

    /**
     * Application exit routine.
     */
    public async exit() {
        this.logger.info("Exiting ...");
        await this.broker.stop();
        this.logger.info("Exited.");
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
        application.exit()
            .then(() => process.exit(0))
            .catch(error => {
                this.logger.error("Orderly exit failed\nReason:\n%o", error);
                process.exit(2);
            });
    }

    process.on("SIGINT", () => {
        console.log();
        onExit();
    });
    process.on("SIGTERM", onExit);
    process.on("SIGHUP", onExit);

    application.start()
        .catch(error => {
            this.logger.error("System start failed\nReason:\n%o", error);
            process.exit(1);
        });
}