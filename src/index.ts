import { Command } from "commander";
import fileName from "./fileName";
import repolist from "./repolist";
import Rest from "./rest";
import download from "./download";
import compress from "./compress";
import { error, info, success } from "log-symbols";
import { rm } from "node:fs/promises";

const program = new Command();
const moreInfo = "more info at https://github.com/dawnimpulse/github-backup";

program
    .name("github-backup")
    .description("Backup user github repos")
    .version(process.env.npm_package_version || "v0.0.0");

program
    .option("-t, --token <char>", `(required) user github token; ${moreInfo}`)
    .option("-nz, --nozip", "(optional) not to create zip of the folder", false)
    .option(
        "-n, --name <char>",
        `(optional) provide filename; you can include variables; ${moreInfo}`,
        "backup-{YYYY-MM-DD-HH-mm-ss}"
    )
    .option(
        "-p, --path <char>",
        "(optional) output directory; default is current directory",
        "./github-backup"
    )
    .option(
        "-c, --concurrent <char>",
        "(optional) concurrent/parallel downloads; default is 2",
        "2"
    )
    .option(
        "-u, --utc",
        "(optional) whether your utc timezone; default is system",
        false
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

            // --- get concurrent/parallel count
            const concurrent = Number(data.concurrent);

            // --- name of the file
            console.log(info, "processing filename & output path");
            let name = fileName(data.name, data.utc);

            // --- path
            let path = data.path + `/${name}`;
            console.log(
                success,
                `saving ${name}${!data.nozip ? ".zip" : ""} in ${data.path}`
            );

            // --- get user info
            console.log(info, "fetching user info from token");
            const user = await Rest.getUserDetails(data.token);
            console.log(success, "fetched user info from token");

            // --- get list of all user repos
            console.log(info, "fetching list of all user repos");
            const repos = await repolist(data.token);
            console.log(success, "fetched list of all user repos");

            // --- download all repos
            console.log(
                info,
                `downloading repos - ${concurrent} repos in parallel`
            );
            await download(repos, user, data.token, path, concurrent);
            console.log(success, "downloaded all repos");

            // --- if compress
            if (!data.nozip) {
                console.log(info, "compressing repos");
                await compress(data.path, name);
                await rm(path, { recursive: true });
                console.log(success, "compressed all repos");
            }

            console.log(
                success,
                `completed successfully in ${(Date.now() - started) / 1000}s`
            );
        } catch (err) {
            console.error(err?.message);
            process.exit();
        }
    })
    .parse();
