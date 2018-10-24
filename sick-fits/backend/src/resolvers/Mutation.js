const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: Check that they are logged in.
    const item = await ctx.db.mutation.createItem({ data: { ...args } }, info);
    return item;
  },
  updateItem(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;
    return ctx.db.mutation.updateItem(
      { data: updates, where: { id: args.id } },
      info
    );
  },
  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    // 1. Find item
    const item = await ctx.db.query.item({ where }, '{id title}');
    // 2. Check if the user owns the item, or have permissions

    // 3. Delete Item
    return ctx.db.mutation.deleteItem({ where }, info);
  }
};

module.exports = Mutations;
