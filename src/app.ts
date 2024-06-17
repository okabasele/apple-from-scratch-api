require('dotenv').config()
import express from 'express';
import stripeWebhook from './webhook/stripe';
const cors = require('cors');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');

const app = express();
const db = require("./models");
const typeDefs =require('./graphql/schemas');
const resolvers = require('./graphql/resolvers');
const apiRoutes = require('./routes');

const initApplication = async() => {
    app.use(cors());
    app.use('/webhook', express.raw({ type: 'application/json' }));
    app.post('/webhook', stripeWebhook);
    if (process.env.FRONTEND_URL) {
        app.options(process.env.FRONTEND_URL, cors());
    }
    app.use(express.json());
    app.use('/', apiRoutes)

    await db.sequelize.sync()
    .then(() => {
        console.log('database synchronised');
    }
    ).catch((err: Error) => {
        console.error('database synchronisation error :', err);
    });

    const serverGraphQL = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await serverGraphQL.start();

    app.use('/graphql',expressMiddleware(serverGraphQL, {
        path: '/graphql',
    }));

    app.listen(process.env.PORT, () => {
        console.log(`server launch on port ${process.env.PORT}`);
    });
}

initApplication();