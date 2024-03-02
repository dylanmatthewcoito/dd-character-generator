
const typeDefs = `
type Character {
  name: String!
  charClass: String!
  race: String!
  backstory: String!
  image: String!
}

type Stats {
  _id: ID
  strength: Int!
  dexterity: Int!
  constitution: Int!
  intelligence: Int!
  wisdom: Int!
  charisma: Int!
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
    stats: [Stats]
  }

  type Mutation {
    createUser(username: String!, password: String!): User
    login(username: String!, password: String!): LoginResponse
  }
`;

module.exports = typeDefs;
