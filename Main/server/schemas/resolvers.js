require('dotenv').config();
const OpenAIApi = require("openai");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Character = require('../models/Character');
const User = require('../models/User')

const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
});

const resolvers = {
    Query: {
        getUserByUsername: async (_, { username }) => {
          try {
            if (!User) {
                throw new Error('User model is undefined in the resolver context');
              }
            const user = await User.findOne({ username }).populate('character');
            return user;
          } catch (error) {
            throw new Error(`Error fetching user by username: ${error.message}`);
          }
        },
        getUserCharacters: async (_, { username }) => {
          try {
            const user = await User.findOne({ username }).populate('character');
            if (!user) {
              throw new Error('User not found');
            }
            return user.character;
          } catch (error) {
            throw new Error(`Error fetching characters for user: ${error.message}`);
          }
        },
        },
    Mutation: {
      createCharacter: async (_, { username, characterInput }) => {
        console.log(characterInput)
        const prompt = `A Dungeons and Dragons themed character named ${characterInput.name}, who has a race of ${characterInput.race}, a class of ${characterInput.charClass}, and their backstory/description is: ${characterInput.backstory}.`;
        try {
          const user = await User.findOne({ username });

          const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt
          });
          console.log(response)
          const imageUrl = response.data[0].url;
          console.log(imageUrl)
          
          if (!user) {
            throw new Error('User not found');
          }
          console.log(user)
          console.log(username)
          // Create a new character associated with the user
          const newCharacter = new Character({
            ...characterInput,
            stat: characterInput.stat,
            user: user._id, // Associate the character with the user
            image: imageUrl,
          });
          
          console.log(newCharacter)
          
          // Save the new character to the database
          const savedCharacter = await newCharacter.save();
          
          // Update the user document to include the character's ID
          user.character.push(savedCharacter._id); // Assuming 'characters' is the array field in the User model
          // Save the updated user document
          await user.save();

  
          return savedCharacter;
        } catch (error) {
          throw new Error(`Error creating character: ${error.message}`);
        }
      },


      createUser: async (_, { username, email, password }) => {
        try {
          // Check if the username already exists
          const existingUser = await User.findOne({ username });
          if (existingUser) {
            throw new Error('Username already exists');
          }
  
          // Create a new user
          const newUser = new User({
            username,
            email,
            password
          });
          // Save the new user to the database
          const savedUser = await newUser.save();
  
          return savedUser;
        } catch (error) {
          throw new Error(error.message);
        }
      },
      login: async (_, { email, password }) => {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('User not found');
        }
      
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error('Invalid credentials');
        }
      
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      
        return { token, user };
      },
    },
  };

module.exports = resolvers;