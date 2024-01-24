import { Command } from "commander";
import fileName from "./fileName";
import repolist from "./repolist";
import Rest from "./rest";
import download from "./download";
import compress from "./compress";
import { info, success, error } from "log-symbols";

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
        "backup-{YYYY-MM-DD-HH-mm-ss}"
    )
    .option("-t, --token <char>", `(required) user github token; ${moreInfo}`)
    .option(
        "-p, --path <char>",
        "(optional) output directory; default is current directory",
        ""
    );

program
    .action(async (data) => {
        const started = Date.now();
        try {
            // --- if no token; then return
            if (!data.token) {
                console.error(
                    error,
                    `user github token is required; ${moreInfo}`
                );
                process.exit();
            }

            // --- name of the file
            console.log(success, "processing filename & output path");
            let name = fileName(data.name);

            // --- path
            let path = data.path + `./${name}`;

            // --- get user info
            console.log(info, "fetching user info from token");
            const user = await Rest.getUserDetails(data.token);
            console.log(success, "fetched user info from token");

            // --- get list of all user repos
            console.log(info, "fetching list of all user repos");
            const repos = await repolist(data.token);
            console.log(success, "fetched list of all user repos");

            // --- download all repos
            console.log(info, "downloading repos");
            await download(repos, user, data.token, path);
            console.log(success, "downloaded all repos");

            // --- compress backup
            console.log(info, "compressing repos");
            await compress(path, `${name}.zip`);
            console.log(success, "compressed all repos");

            console.log(
                success,
                `completed successfully in ${Date.now() - started}s`
            );
        } catch (err) {
            console.error(err?.message);
            process.exit();
        }
    })
    .parse();
