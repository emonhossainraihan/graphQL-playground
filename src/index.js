const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");
const { request } = require("express");
const prisma = new PrismaClient();

// Resolvers
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Subscription = require('./resolvers/Subscription')
const Vote = require('./resolvers/Vote')

// For subscription
const { PubSub } = require('graphql-yoga')
const pubsub = new PubSub()

// actual implementation of the GraphQL schema
// its structure is identical to the structure of the type definition


const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote
}

// 3
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
      pubsub
    }
  },
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
