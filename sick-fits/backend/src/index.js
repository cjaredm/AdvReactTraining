const cookieParser = require('cookie-parser');
require('dotenv').config({ path: '.env' });
const createServer = require('./createServer');
const db = require('./db');
const jwt = require('jsonwebtoken');

const server = createServer();

// Use epxress middleware to handle cookies (JWT)
server.express.use(cookieParser());

// This is Middleware
// Decode the JWT so we can get th euser ID on each request
server.express.use((req, resp, next) => {
  const { token } = req.cookies;
  if (token) {
    const userId = jwt.verify(token, process.env.APP_SECRET);
    // put the userId onto the req for future requests to access
    req.userId = userId.userId;
  }
  next();
});

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
