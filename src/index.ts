import { Command } from "commander";
import fileName from "./fileName";
import repolist from "./repolist";
import Rest from "./rest";
import download from "./download";

const program = new Command();
const moreInfo = "more info at https://github.com/dawnimpulse/github-backup";

program
    .name("github-backup")
    .description("Backup user github repos")
    .version(process.env.npm_package_version || "v0.0.0");

program
    .option("-nz, --nozip", "(optional) not to create zip of the folder", false)
    .option(
        "-n, --name <char>",
        `provide filename (optional); you can include variables; ${moreInfo}`,
        "backup-{YYYY-MM-DD-HH-mm}"
    )
    .option("-t, --token <char>", `(required) user github token; ${moreInfo}`);

program
    .action(async (data) => {
        try {
            // --- if no token; then return
            if (!data.token) {
                console.error(`user github token is required; ${moreInfo}`);
                process.exit();
            }

            // --- name of the file
            let name = fileName(data.name);

            // --- get user info
            const user = await Rest.getUserDetails(data.token);

            // --- get list of all user repos
            const repos = await repolist(data.token);

            // --- download all repos
            await download(repos, user, data.token, "./repos");
        } catch (err) {
            console.error(err?.message);
            process.exit();
        }
    })
    .parse();
