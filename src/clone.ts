import { GithubRepo } from "./interfaces";
import { exec } from "node:child_process";

/**
 * clone repo
 * @param repo
 * @param username
 * @param token
 * @param path
 */
export default function (
    repo: GithubRepo,
    username: string,
    token: string,
    path: string
) {
    return new Promise((resolve, reject) => {
        exec(
            `git clone https://${username}:${token}@github.com/${repo.full_name}.git ${path}/${repo.name}`,
            (error, stdout, stderr) => {
                if (error) reject(error.message);
                else resolve(true);
            }
        );
    });
}
