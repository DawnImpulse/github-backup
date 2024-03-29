import Rest from "./rest";
import { GithubRepo } from "./interfaces";

/**
 * list of all user repos
 * @param token
 */
export default async function (token: string): Promise<GithubRepo[]> {
    // --- we will set this false once any response is empty or less than page size
    let cont = true;
    let page = 1;
    const repos: Map<string, GithubRepo> = new Map();

    while (cont) {
        const data = await Rest.getRepoList(token, page++); // page var increment after usage
        const filteredData = data.filter((el) => el.permissions.pull);

        //  save into map
        filteredData.forEach((el: GithubRepo) => repos.set(el.name, el));
        if (data.length < 50) cont = false;
    }

    return Array.from(repos.values());
}
