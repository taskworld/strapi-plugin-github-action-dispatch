import pluginId from '../pluginId.json'

import { Github } from "@strapi/icons";

import { getActionUid } from "./utils/actions";

export default {
  register(app: any) {
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: Github,
      intlLabel: {
        id: `${pluginId}.name`,
        defaultMessage: "Publish",
      },
      Component: async () =>
        import(
          /* webpackChunkName: "github-action-dispatch-page" */ './pages/Main'
        ),
      permissions: [
        {
          action: getActionUid('check'),
          subject: null,
        },
        {
          action: getActionUid('trigger'),
          subject: null,
        },
      ],
    });
  },

  bootstrap(app: any) {},
  async registerTrads(app: any) {
    return []
  },
};
