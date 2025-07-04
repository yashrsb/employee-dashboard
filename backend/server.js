require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');
const authMiddleware = require('./middleware/auth');

const app = express();
app.use(authMiddleware);

async function start() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ user: req.user }),
  });

  await server.start();
  server.applyMiddleware({ app });

  await mongoose.connect(process.env.MONGO_URI);

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

start();
