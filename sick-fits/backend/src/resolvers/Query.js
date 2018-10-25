const { forwardTo } = require('prisma-binding');

/*
forwardTo just sends the method to prisma.graphql and uses the method with the same name there.
If you want to write your own, as we will later, we'll do it as the commented out example below.
*/

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db')
  // async items(partent, args, ctx, info) {
  //   const items = await ctx.db.query.items();
  //   return items;
  // }
};

module.exports = Query;
