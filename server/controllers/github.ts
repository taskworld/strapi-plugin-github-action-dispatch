import type { Strapi } from "@strapi/strapi";
import type { ControllerFactory } from "./types";

import pluginId from "../../pluginId.json";

import type { GithubOpts } from '../config'

function getGithubOpts({ strapi }: { strapi: Strapi }) {
  const optsKeys: (keyof GithubOpts)[] = ['token', 'repository', 'workflow', 'ref']

  return optsKeys.reduce((acc, key) => ({
    ...acc, [key]: strapi
    .plugin(pluginId)
    .config(key)
  })
  , {})
}

export const githubController: ControllerFactory = ({ strapi }) => ({
  async check(ctx) {
    try {
      const data = await strapi
        .plugin(pluginId)
        .service("github")
        .check(getGithubOpts({ strapi }));

      ctx.body = data;
    } catch (err) {
      console.error(err)
      ctx.status = 500;
    }
  },

  async trigger(ctx) {
    try {
      const success = await strapi
        .plugin(pluginId)
        .service("github")
        .trigger({
          email: ctx.state.user.email,
          ...getGithubOpts({ strapi }),
        });

      ctx.body = { success };
    } catch (err) {
      console.error(err)
      ctx.status = 500;
    }
  },
});
