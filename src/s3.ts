import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { createReadStream, readdirSync } from "node:fs";
import { join, sep } from "node:path";

export interface S3Config {
    bucket: string;
    endpoint: string;
    accessKeyId: string;
    secretAccessKey: string;
    prefix?: string;
    region: string;
}

export class S3Manager {
    private readonly client: S3Client;
    private config: S3Config;

    /**
     * Creates an instance of S3Manager
     * @param {S3Config} config - The configuration object for S3
     */
    constructor(config: S3Config) {
        this.config = config;
        this.client = new S3Client({
            ...config,
            credentials: {
                accessKeyId: config.accessKeyId,
                secretAccessKey: config.secretAccessKey,
            },
            forcePathStyle: true,
        });
    }

    /**
     * Uploads a single file to S3
     * @param {string} localPath - The local path of the file to upload
     * @param {string} key - The S3 key (path) where the file will be uploaded
     * @returns {Promise<void>}
     * @private
     */
    private async uploadFile(localPath: string, key: string): Promise<void> {
        const stream = createReadStream(localPath);
        const prefixedKey = this.config.prefix
            ? `${this.config.prefix}/${key}`
            : key;
        const upload = new Upload({
            client: this.client,
            params: {
                Bucket: this.config.bucket,
                Key: prefixedKey,
                Body: stream,
            },
        });
        await upload.done();
    }

    /**
     * Recursively walks through a directory to collect all file paths
     * @param {string} dir - The directory to walk through
     * @param {string} baseDir - The base directory for relative path calculation
     * @param {string[]} files - Accumulator array for file paths
     * @returns {string[]} Array of file paths
     * @private
     */
    private walk(dir: string, baseDir: string, files: string[] = []): string[] {
        const entries = readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            const full = join(dir, entry.name);
            if (entry.isDirectory()) this.walk(full, baseDir, files);
            else files.push(full);
        }
        return files;
    }

    /**
     * Uploads an entire directory to S3
     * @param {string} localDir - The local directory to upload
     * @param {string} remotePrefix - The S3 prefix (path) where the directory will be uploaded
     * @returns {Promise<void>}
     */
    async uploadDirectory(
        localDir: string,
        remotePrefix: string
    ): Promise<void> {
        // Ensure trailing slash removed from remotePrefix and basePrefix
        const basePrefix = (this.config.prefix || "").replace(/^\/+|\/+$/g, "");
        const normPrefix = remotePrefix.replace(/^\/+|\/+$/g, "");
        const files = this.walk(localDir, localDir);
        for (const filePath of files) {
            const relative = filePath
                .substring(localDir.length)
                .replace(/^\/+|^\\+/, "");
            // Combine basePrefix, remotePrefix with the file's relative path for the S3 key
            const key = [basePrefix, normPrefix, relative]
                .filter(Boolean)
                .join("/")
                .replace(/\\/g, "/");
            // uploadFile method will handle adding the config prefix
            await this.uploadFile(filePath, key);
        }
    }

    /**
     * Uploads a single file to S3 with optional custom name
     * @param {string} localFile - The local file path to upload
     * @param {string} [targetName] - Optional custom name for the file in S3
     * @returns {Promise<void>}
     */
    async uploadSingleFile(
        localFile: string,
        targetName?: string
    ): Promise<void> {
        const name = targetName || localFile.split(sep).pop()!;
        const key = name;
        await this.uploadFile(localFile, key);
    }
}
