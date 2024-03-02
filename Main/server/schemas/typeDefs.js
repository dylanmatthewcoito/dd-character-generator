
const typeDefs = `
type Character {
  name: String!
  className: String!
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

  type LoginResponse {
    token: String!
    user: User!
  }

  type Query {
    getUserByUsername(username: String!): User
  }

  type Mutation {
    createUser(username: String!, password: String!): User
    login(username: String!, password: String!): LoginResponse
  }
`;

module.exports = typeDefs;
