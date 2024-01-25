import { GithubRepo, GithubUser } from "./interfaces";
import clone from "./clone";

export default async function (
    repos: GithubRepo[],
    user: GithubUser,
    token: string,
    path: string
) {
    const total = repos.length;
    let done = 0;
    let failed = 0;

    for await (let repo of repos) {
        await clone(repo, user.login, token, path)
            .then(() => ++done)
            .catch((err) => {
                console.error(err);
                ++failed;
            });
        console.log(`Downloaded ${done}/${total} , Failed ${failed}`);
    }
}
