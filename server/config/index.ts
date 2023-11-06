function isDefinedString(str: any): str is string {
  return typeof str === "string" && str.trim().length > 0;
}

export type GithubOpts = {
  token: string
  repository: string
  workflow: string
  ref: string
}

export default {
  default: {
    token: undefined,
    repository: undefined,
    workflow: undefined,
    ref: "main",
  },
  validator: (config: any) => {
    ["token", "repository", "workflow"].forEach((key) => {
      if (!isDefinedString(config[key]))
        throw new Error(`missing field "${key}" in config`);
    });
  },
};
