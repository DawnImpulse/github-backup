import Rest from "./rest";
import { GithubRepo } from "./interfaces";

/**
 * list of all user repos
 * @param token
 */
export default async function (token: string) {
    // --- we will set this false once any response is empty or less than page size
    let cont = true;
    let page = 1;
    const repos: GithubRepo[] = [];

    while (cont) {
        const data = await Rest.getRepoList(token, page++); // page var increment after usage
        repos.push(...data.filter((el) => el.permissions.pull));
        if (data.length < 50) cont = false;
    }

    console.log(repos.map((el) => el.name));
}
