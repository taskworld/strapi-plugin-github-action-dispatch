import { Common } from "@strapi/strapi";

export const auth: Common.MiddlewareFactory<{
  actionId: string;
}> = ({ actionId }, { strapi }) => {
  return async (ctx, next) => {
    if (ctx.state.user) {
      const hasPermission = await strapi
        .service("admin::permission")
        .hasPermissions({
          user: ctx.state.user,
          action: actionId,
          subject: null,
        });

      if (hasPermission) {
        await next();
        return;
      }
    }

    ctx.status = 403;
  };
};
