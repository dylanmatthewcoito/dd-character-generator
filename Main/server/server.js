const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const imageRoutes = require('./routes/openaiRoutes');
const cors = require('cors');
// Import Stripe and initialize with secret key
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');


const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        return { user };
      } catch (e) {
        throw new Error('Your session expired. Sign in again.');
      }
    }
  },
});

const startApolloServer = async () => {
  await server.start();
  
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use('/api/generate-image', imageRoutes);
  app.use('/graphql', expressMiddleware(server));

  // Route to create a payment intent
  app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;

    try {
      // Create a payment intent with the specified amount
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // Convert amount to cents
        currency: 'usd',
        // You can add more options like metadata, description, etc. here
      });
    
      // Send client secret back to the client along with success message
      res.json({ success: true, message: 'Payment intent created successfully💳', clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error('Error creating payment intent:', error);
      res.status(500).json({ success: false, error: 'Failed to create payment intent❌' });
    }
  });

  // if we're in production, serve client/dist as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  } 


  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('Connected to the database');
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();