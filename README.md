when we talked about the definition of the `info: String!` field and said the exclamation mark means this field could never be null. Well, since you’re implementing the resolver, you are in control of what the value for that field is, right?

So, what happens if you return null instead of the actual informative string in the resolver implementation? => Got error

This is in fact one of the core benefits of GraphQL in general: it enforces that the API actually behaves in the way that is promised by the schema definition! This way, everyone who has access to the GraphQL schema can always be 100% sure about the API operations and data structures that are returned by the API.

> At the core of every GraphQL API, there is a GraphQL schema.

GraphQL schemas are usually written in the GraphQL Schema Definition Language (SDL). SDL has a type system that allows you to define data structures.

Every GraphQL schema has three special root types: Query, Mutation, and Subscription. The root types correspond to the three operation types offered by GraphQL: queries, mutations, and subscriptions. The fields on these root types are called root fields and define the available API operations.

> When the type of a root field is an object type, you can further expand the query (or mutation/subscription) with fields of that object type.

In general, when adding a new feature to the API, the process will look pretty similar every time(schema-driven or schema-first development):

1. Extend the GraphQL schema definition with a new root field (and new object types, if needed)
2. Implement corresponding resolver functions for the added fields

> Each level of nesting (i.e. nested curly braces) corresponds to one resolver execution level.

## Integrating prisma

Prisma has a schema, too! You can think of the prisma.schema file as a database schema. It has three components:

- Data source: Specifies your database connection.
- Generator: Indicates that you want to genenerate Prisma Client.
- Data model: Defines your application models. Each model will be mapped to a table in the underlying database.

> By the way windows show issue with yarn: `npm install @prisma/cli --save-dev`

# Prisma

> Prisma Client(provides the database layer which offers CRUD operations) is used to access the database in your GraphQL resolvers (similar to an ORM)

ORMs are libraries that map tables in your database to classes in your programming language. [Prisma](https://www.prisma.io/docs/understand-prisma/prisma-in-your-stack/is-prisma-an-orm), on the other hand, is a database toolkit. The toolkit includes Prisma Client, which is an auto-generated query builder that exposes queries which are tailored to your models.

It replaces traditional ORMs and makes database access easy, migrates your database schema.

## Exploring your data in Prisma Studio

- `npx prisma studio --experimental`
  
## workflow for updating your data

- Manually adjust your Prisma data model.
- Migrate your database using the prisma migrate CLI commands `npx prisma migrate save --experimental` and `npx prisma migrate up --experimental`.
- (Re-)generate Prisma Client
- Use Prisma Client in your application code to access your database.

## Wiring up GraphQL schema with Prisma Client

- The GraphQL `context` resolver argument

After every change you make to the data model, you need to migrate your database and then re-generate Prisma Client

- npx prisma migrate save --name "add-user-model" --experimental
- npx prisma migrate up --experimental
- npx prisma generate

