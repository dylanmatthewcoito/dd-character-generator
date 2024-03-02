
const typeDefs = `
type Character {
  name: String!
  charClass: String!
  race: String!
  backstory: String!
  image: String!
}

  type User {
    _id: ID!
    username: String!
    password: String!
    character: Character
  }

  type Query {
    getUserByUsername(username: String!): User
  }

  type Mutation {
    createUser(username: String!, password: String!): User
  }
`;

module.exports = typeDefs;
