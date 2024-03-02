const User = require('../models/User');

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
        },
    Mutation: {
      createUser: async (_, { username, password }) => {
        try {
          // Check if the username already exists
          const existingUser = await User.findOne({ username });
          if (existingUser) {
            throw new Error('Username already exists');
          }
  
          // Create a new user
          const newUser = new User({
            username,
            password,
          });
          // Save the new user to the database
          const savedUser = await newUser.save();
  
          return savedUser;
        } catch (error) {
          throw new Error(error.message);
        }
      },
    },
  };

module.exports = resolvers;
