import pluginId from "../../pluginId.json";

export default [
  {
    method: "GET",
    path: "/",
    handler: "github.check",
    config: {
      policies: [`plugin::${pluginId}.canCheck`],
    },
  },
  {
    method: "POST",
    path: "/",
    handler: "github.trigger",
    config: {
      policies: [`plugin::${pluginId}.canTrigger`],
    },
  },
];
