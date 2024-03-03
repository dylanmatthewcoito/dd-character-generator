
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
    character: Character
  }

  type LoginResponse {
    token: String!
    user: User!
  }

  type Query {
    getUserByUsername(username: String!): User
    Stat: [Stat]
  }

  type Mutation {
    createUser(username: String!, password: String!): User
    login(username: String!, password: String!): LoginResponse
  }
`;

module.exports = typeDefs;