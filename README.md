# strapi-plugin-github-action-dispatch

This plugin provides a web ui to trigger a Github workflow run from strapi's admin panel as well as a list of the latest run status and results.

## Installation

- Install the plugin with `yarn add strapi-plugin-github-action-dispatch`

## Configuration

The plugin will run without options by default.

**When doing so, the generated tarball name will be your package.json name field, and encryption will be disabled.**

In your `config/plugins.js` you can add:

```js
{
  "strapi-plugin-github-action-dispatch": {
    enabled: true,
    config: {
      token: env("GITHUB_TOKEN"),
      repository: 'my-username-or-org/my-repo-name',
      workflow: "my-workflow.yml",
      ref: "main" // optional, defaults to main
    }
  }
}
```

- The `token` should be a GitHub PAT with permissions to list workflows and run them (Actions: RW)
- the `repository` is your typical `${owner}/${repo}` in one string
- the `workflow` is either the file name or the workflow id (as per Github API spec)

## ACL

You can go an enable/disable this plugin's actions in the roles section of the admin panel. This should enable/disable endpoints and stop displaying the section according to the permissions you provided.

## GitHub Workflow

A boilerplate file for your workflow should be this one:

```yml
name: 🚀
run-name: 🚀 (by ${{ inputs.email }})

on:
  workflow_dispatch:
    inputs:
      email:
        default: 'unknown@example.com' # used to mark ownership of the run from strapi

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - run: echo "hello world"
```

As you can see in the screenshot at the top of this README, there's an `Initiator` column which logs which user triggered the workflow run. In order to avoid creating a GitHub account for every Strapi user and ask them to create a PAT, there's an `inputs.email` field provided in the workflow run to store the user's identity.

Sadly, due to a limitation in GitHub's APi, we cannot fetch a run's inputs so we have no choice but to leverage `run-name` to insert the `inputs.email` and later parse it in the APi response.
