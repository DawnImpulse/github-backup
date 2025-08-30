import fileName from "./fileName";
import repolist from "./repolist";
import Rest from "./rest";
import download from "./download";
import compress from "./compress";
import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import cron from "node-cron";
import Moment from "./moment";
import { S3Manager } from "./s3";

interface EnvConfig {
    token: string;
    namePattern: string;
    outputPath: string;
    concurrent: number;
    utc: boolean;
    s3Bucket?: string;
    s3Prefix?: string;
    s3Mode?: "direct" | "zip";
    s3Region?: string;
    s3Endpoint?: string;
    s3AccessKeyId?: string;
    s3SecretAccessKey?: string;
    cronSchedule: string;
}

function readEnv(): EnvConfig {
    const token = process.env.GITHUB_TOKEN || "";
    if (!token) {
        console.error("GITHUB_TOKEN is required in Docker mode");
        process.exit(1);
    }
    const cronSchedule = process.env.CRON_SCHEDULE || "* 0 * * *";
    const namePattern = process.env.NAME || "backup-{YYYY-MM-DD-HH-mm-ss}";
    const outputPath = process.env.BACKUP_DIR || "/github-backup"; // expected volume mount
    const concurrent = Number(process.env.CONCURRENT || "2");
    const utc = (process.env.UTC || "false").toLowerCase() === "true";
    const s3Bucket = process.env.S3_BUCKET;
    const s3Endpoint = process.env.S3_ENDPOINT;
    const s3Prefix = process.env.S3_PREFIX || "";
    const s3Mode = (process.env.S3_MODE as EnvConfig["s3Mode"]) || undefined; // "direct"|"zip"
    const s3Key = process.env.S3_KEY;
    const s3Secret = process.env.S3_SECRET;
    const s3Region = process.env.S3_REGION;

    return {
        token,
        namePattern,
        outputPath,
        concurrent,
        utc,
        s3Bucket,
        s3Prefix,
        s3Mode,
        s3Endpoint,
        s3Region,
        s3AccessKeyId: s3Key,
        s3SecretAccessKey: s3Secret,
        cronSchedule,
    };
}

async function runBackupOnce(env: EnvConfig) {
    const started = Date.now();
    const name = fileName(env.namePattern, env.utc);
    const dirPath = env.outputPath + `/${name}`;

    try {
        if (!existsSync(env.outputPath))
            await mkdir(env.outputPath, { recursive: true });
        console.log(`Using backup directory: ${dirPath}`);

        // Get user
        console.log("Fetching user details...");
        const user = await Rest.getUserDetails(env.token);
        // Get repos
        console.log("Fetching repository list...");
        const repos = await repolist(env.token);
        console.log(`Found ${repos.length} repositories`);
        // Download
        console.log("Starting repository download...");
        await download(repos, user, env.token, dirPath, env.concurrent);
        console.log("Repository download completed");

        // S3 handling
        if (env.s3Bucket) {
            const s3Manager = new S3Manager({
                endpoint: env.s3Endpoint || "",
                bucket: env.s3Bucket || "",
                accessKeyId: env.s3AccessKeyId || "",
                secretAccessKey: env.s3SecretAccessKey || "",
                prefix: env.s3Prefix,
                region: env.s3Region || "us-west-2",
            });
            const timestampFolder = name; // use generated name as folder in S3

            console.log(`Starting S3 upload to bucket: ${env.s3Bucket}`);
            if (env.s3Mode === "direct") {
                await s3Manager.uploadDirectory(dirPath, timestampFolder);
            } else {
                await compress(env.outputPath, name);
                const zipPath = `${env.outputPath}/${name}.zip`;
                await s3Manager.uploadSingleFile(zipPath, `${name}.zip`);
                // Delete local zip and directory after upload
                try {
                    const { rm } = await import("node:fs/promises");
                    await rm(zipPath);
                    await rm(dirPath, { recursive: true });
                } catch {}
            }
            // Clean up directory after direct upload
            if (env.s3Mode === "direct") {
                try {
                    const { rm } = await import("node:fs/promises");
                    await rm(dirPath, { recursive: true });
                } catch {}
            }
        }

        // Create zip for local storage
        if (!env.s3Bucket) {
            console.log("Creating local backup archive...");
            await compress(env.outputPath, name);
            console.log("Local backup archive created");
            // Clean up directory after creating local zip
            try {
                const { rm } = await import("node:fs/promises");
                await rm(dirPath, { recursive: true });
                console.log("Local backup directory removed");
            } catch {}
        }

        console.log(
            `completed successfully in ${(Date.now() - started) / 1000}s`
        );
    } catch (err: any) {
        console.error(err?.message || err);
    }
}

async function main() {
    const env = readEnv();
    console.log(`Starting cron with schedule: ${env.cronSchedule}`);
    // Run immediately once at start and then per schedule
    await runBackupOnce(env);
    cron.schedule(env.cronSchedule, async () => {
        console.log(
            `[${Moment.parse("YYYY-MM-DD HH:mm:ss", false)}] Running scheduled backup`
        );
        await runBackupOnce(env);
    });
    // Keep process alive
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setInterval(() => {}, 1 << 30);
}

main();
