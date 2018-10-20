require("dotenv").config({ path: ".env" });
const createServer = require("./createServer");
const db = require("./db");

const server = createServer();

// TODO use epxress middleware to handle cookies (JWT)
// TODO Use express middlware to populate current user

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  deets => {
    console.log(
      `server is now running on port: http://localhost:${deets.port}`
    );
  }
);
