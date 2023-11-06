import { Octokit } from "@octokit/core";

import type { ServiceFactory } from "./types";

import type { GithubOpts } from "../config";

export const githubService: ServiceFactory = () => ({
  async check({ token, repository, workflow }: GithubOpts) {
    const octokit = new Octokit({ auth: token });
    const [owner, repo] = repository.split('/')

    const { data } = await octokit.request('GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs', {
      owner,
      repo,
      workflow_id: workflow,
      per_page: 10,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })

    return data
  },

  async trigger({ email, token, repository, workflow, ref }: { email: string } & GithubOpts) {
    const octokit = new Octokit({ auth: token });
    const [owner, repo] = repository.split('/')

    await octokit.request('POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches', {
      owner,
      repo,
      workflow_id: workflow,
      ref,
      inputs: {
        email
      },
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })

    return true
  },
});
