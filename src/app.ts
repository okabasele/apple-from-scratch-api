import express, { Request, Response } from 'express';

require('dotenv').config()
const app = express();
const cors = require('cors');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const db = require("./models");
const typeDefs =require('./graphql/schemas');
const resolvers = require('./graphql/resolvers');

const initApplication = async() => {
    app.use(cors());
    if (process.env.FRONTEND_URL) {
        app.options(process.env.FRONTEND_URL, cors());
    }
    app.use(express.json());

    await db.sequelize.sync()
    .then(() => {
        console.log('database synchronised');
    }
    ).catch((err: Error) => {
        console.error('database synchronisation error :', err);
    });

    app.get("/", (req: Request, res: Response) => {
        res.send("Welcome to my API");
    })

    const serverGraphQL = new ApolloServer({
        typeDefs,
        resolvers
    })

    await serverGraphQL.start();

    app.use(expressMiddleware(serverGraphQL, {
        path: '/graphql',
    }));

    app.listen(process.env.PORT, () => {
        console.log(`server launch on port ${process.env.PORT}`);
    });
}

initApplication();