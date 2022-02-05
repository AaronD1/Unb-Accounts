import { createServer } from '@graphql-yoga/node'
import { envelop } from '@envelop/core'
import { useAuth0 } from '@envelop/auth0'
import { makeExecutableSchema } from '@graphql-tools/schema' // just for testing

// test schema
let schema = makeExecutableSchema({
  typeDefs: /* GraphQL */ `
    type AuthenticationInfo {
      sub: String!
    }

    type Query {
      authInfo: AuthenticationInfo
      clientGreetings: String!
    }
  `,
  resolvers: {
    Query: {
      authInfo(_source, _args, context) {
        return context.auth0;
      },
      clientGreetings() {
        return "Hello from the client service!"
      }
    },
  },
});

// Server options
process.env.PORT = 4001

// reconfigure for this service
let server = createServer({
  schema,
})

// set this to port 4001
server.start() 
