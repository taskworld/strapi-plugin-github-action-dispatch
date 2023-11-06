import type { Common } from "@strapi/strapi";

import { getActionUid } from "../actions";

const canCheck: Common.Policy = (ctx, cfg, { strapi }) => {
  return ctx.state.userAbility.can(getActionUid('check'));
};

const canTrigger: Common.Policy = (ctx, cfg, { strapi }) => {
  return ctx.state.userAbility.can(getActionUid('trigger'));
};

export default {
  canCheck,
  canTrigger,
};
