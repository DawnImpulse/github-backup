export interface GithubRepo {
    name: string;
    full_name: string;
    permissions: {
        pull: boolean;
    };
}

export interface GithubUser {
    login: string;
}
