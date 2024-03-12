require('dotenv/config')
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
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
  app.use('/graphql', expressMiddleware(server));
  app.use('/images', express.static(path.join(__dirname, 'public/images')));

  // Route to create a checkout session (handles payment on Stripe's servers)
  app.post('/api/checkout-session', async (req, res) => {
    console.log(req.headers)

    // Create a product named "donation"
    const donation = await stripe.products.create({
      name: 'Donation',
    });

    // Create a price object to set currency & enable custom_unit_amount option to allow users to choose amount to donate
    const price = await stripe.prices.create({
      currency: 'usd',
      custom_unit_amount: {
        enabled: true,
      },
      product: donation.id,
    });

    const session = await stripe.checkout.sessions.create({
      cancel_url: `http://${req.get('origin')}/app/donate`,
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://${req.get('origin')}/app/donate`,
    });
    res.status(201).json(session.url);
    console.log(session)
  });

  // if we're in production, serve client/dist as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  } 
  
  // Define route for /donate
  app.get('/donate', (req, res) => {
    // Send the index.html file
    res.sendFile(path.join(__dirname, '../client/dist/', 'index.html'));
  });

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