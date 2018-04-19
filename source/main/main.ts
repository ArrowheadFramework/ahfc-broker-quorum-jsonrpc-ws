import * as frontend from "./frontend";
import * as process from "process";

/**
 * Application main class.
 */
class Application {
    private readonly server: frontend.ArrowheadServer;

    /**
     * Creates new application.
     * 
     * @param argv Application command line arguments.
     */
    constructor(argv = process.argv.slice(2)) {
        console.log("+ argv: " + argv);
        this.server = new frontend.ArrowheadServer();
    }

    /**
     * Application start routine.
     */
    public async start() {
        console.log("+ starting ...");
        await this.server.start();
        console.log("+ started")
    }

    /**
     * Application exit routine.
     */
    public async exit() {
        console.log("+ exiting ...");
        await this.server.stop();
        console.log("+ bye!");
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
                console.log("+ orderly exit failed");
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
            console.log("+ system start failed");
            console.log("Reason:");
            console.log(error);
            process.exit(1);
        });
}