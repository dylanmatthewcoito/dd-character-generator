import { gql } from '@apollo/client';

export const GET_USER_CHARACTERS = gql`
  query GetUserCharacters($username: String!) {
    getUserCharacters(username: $username) {
      _id
      name
      charClass
      race
      backstory
      image
      stat {
        strength
        dexterity
        constitution
        intelligence
        wisdom
        charisma
      }
    }
  }
`;