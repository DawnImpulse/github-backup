import axios from "axios";
import { GithubRepo, GithubUser } from "./interfaces";

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

        return axios
            .request(config)
            .then((resp) => resp.data)
            .catch((error) => {
                if (error?.response)
                    throw new Error(
                        `(${error.response.status}) ${error.response.data}`
                    );
                else if (error.request)
                    throw new Error(
                        "the request was made but no response was received; check internet & try again"
                    );
                else throw error;
            });
    }

    /**
     * get user basic details
     */
    static async getUserDetails(token: string): Promise<GithubUser> {
        let config = {
            method: "get",
            url: `https://api.github.com/user`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        return axios
            .request(config)
            .then((resp) => resp.data)
            .catch((error) => {
                if (error?.response)
                    throw new Error(
                        `(${error.response?.status}) ${error.response?.data?.message}`
                    );
                else if (error.request)
                    throw new Error(
                        "the request was made but no response was received; check internet & try again"
                    );
                else throw error;
            });
    }
}
