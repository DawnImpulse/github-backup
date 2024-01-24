import axios from "axios";
import { GithubRepo } from "./interfaces";

export default class Rest {
    /**
     * get user repo list
     */
    static async getRepoList(
        token: string,
        page: number = 1
    ): Promise<GithubRepo[]> {
        let config = {
            method: "get",
            url: `https://api.github.com/user/repos?page=${page}&per_page=50`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        return axios.request(config).then((resp) => resp.data);
    }
}
