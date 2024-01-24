import { Command } from "commander";
import fileName from "./fileName";
import repolist from "./repolist";
import * as fs from "fs";
import clone from "./clone";
import { GithubRepo } from "./interfaces";
import { log } from "node:util";

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
        // --- if no token; then return
        if (!data.token) {
            console.error(`user github token is required; ${moreInfo}`);
            process.exit();
        }

        // --- name of the file
        let name = fileName(data.name);

        // --- get list of all user repos
        //await repolist(data.token);
    })
    .parse();
