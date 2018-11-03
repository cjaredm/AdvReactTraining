const { forwardTo } = require('prisma-binding');

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
  }
};

module.exports = Query;
