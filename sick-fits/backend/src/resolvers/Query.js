const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');

/*
forwardTo just sends the method to prisma.graphql and uses the method with the same name there.
If you want to write your own, as we will later, we'll do it as the commented out example below.
*/

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  me(parent, args, ctx, info) {
    // Check if there is a current user id
    if (!ctx.request.userId) return null;
    return ctx.db.query.user({ where: { id: ctx.request.userId } }, info);
  },
  async users(parent, args, ctx, info) {
    //1. Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in!');
    }
    // 2. Check if user has permission to query all users
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);
    // 3. If they do, query all the users
    return ctx.db.query.users({}, info);
  }
};

module.exports = Query;
