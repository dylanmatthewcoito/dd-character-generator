
const typeDefs = `
type Character {
  name: String!
  charClass: String!
  race: String!
  backstory: String!
  image: String!
  stat: Stat
}

type Stat {
  _id: ID
  strength: Int!
  dexterity: Int!
  constitution: Int!
  intelegence: Int!
  wisdom: Int!
  charisma: Int!
}

  type User {
    _id: ID!
    username: String!
    password: String!
    email: String!
    character: Character
  }
  type AuthPayload {
    token: String!
    user: User!
  }
  type LoginResponse {
    token: String!
    user: User!
  }

  type Query {
    getUserByUsername(username: String!): User
    character: [Character]
  }

  type Mutation {
    createUser(username: String!, email: String! password: String!): User
    login(username: String!, password: String!): LoginResponse
  }
`;

module.exports = typeDefs;