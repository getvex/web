import { OCTOKIT_AUTH_TOKEN } from "$env/static/private"
import { Octokit } from "@octokit/core"

export const octo = new Octokit({
    auth: OCTOKIT_AUTH_TOKEN
})
