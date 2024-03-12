// client/src/utils/mutations.js
import React from "react";
import { useMutation, gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
    }
  }
`;

const CREATE_CHARACTER = gql`
  mutation CreateCharacter(
    $username: String!
    $characterInput: CharacterInput!
  ) {
    createCharacter(username: $username, characterInput: $characterInput) {
      name
      charClass
      race
      backstory
      image
      stat {
        charisma
        constitution
        dexterity
        intelligence
        strength
        wisdom
      }
    }
  }
`;
