import { GithubRepo, GithubUser } from "./interfaces";
import clone from "./clone";

export default async function (
    repos: GithubRepo[],
    user: GithubUser,
    token: string,
    path: string,
    concurrent: number
) {
    const total = repos.length;
    let done = 0;
    let failed = 0;

    const clonePromises: any[] = [];

    for (const repo of repos) {
        clonePromises.push(
            (async () => {
                try {
                    await clone(repo, user.login, token, path);
                    ++done;
                } catch (err) {
                    console.error(err);
                    ++failed;
                }
            })()
        );

        // Limit concurrent clones
        if (clonePromises.length >= concurrent) {
            await Promise.all(clonePromises.splice(0, concurrent));
            console.log(`Downloaded ${done}/${total} , Failed ${failed}`);
        }
    }

    // Wait for any remaining clones
    await Promise.all(clonePromises);
}
