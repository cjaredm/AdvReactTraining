const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
  },

  async signup(parent, args, ctx, info) {
    // To make all signup usages the same, lowercase the email
    args.email = args.email.toLowerCase();
    // has the password
    const password = await bcrypt.hash(args.password, 10);
    // create user in db
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ['USER'] }
        }
      },
      info
    );
    // Create JWT token for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // We set the JWT as a cookie on the response
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // One year cookie
    });
    // Finally we return the user to the browser
    return user;
  },

  async signin(parent, { email, password }, ctx, info) {
    // 1. Check if there is a user with that email
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      // Only if its okay tell them there is no account with that email
      throw new Error(`No such user found for email ${email}`);
    }

    // 2. check if their password is correct.
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error(`Invalid password!`);
    }
    // 3. generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // 4. Set the cookie with the token
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // One year cookie
    });
    // 5. Return the user
    return user;
  },
  signout(parent, args, ctx, info) {
    ctx.response.clearCookie('token');
    return { message: 'Goodbye!' };
  }
};

module.exports = Mutations;
