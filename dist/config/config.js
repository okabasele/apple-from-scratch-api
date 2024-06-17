"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var dotenv = require('dotenv');
// On récupère l'environement dans lequel on se trouve (développement, production, test)
var environment = process.env.NODE_ENV || 'development';
var envFile;
// On détermine le fichier .env à utiliser en fonction de l'environement
switch (environment) {
    case 'development':
        envFile = '.env.dev';
        break;
    case 'production':
        envFile = '.env.prod';
        break;
    default:
        envFile = '.env.dev';
        break;
}
// On charge les variables d'environement du fichier .env
dotenv.config({ path: envFile });
// destructuration des variables d'environement dans le fichier .env
var _a = process.env, DB_USER = _a.DB_USER, DB_PWD = _a.DB_PWD, DB_NAME = _a.DB_NAME, DB_HOST = _a.DB_HOST, DB_PORT = _a.DB_PORT, DB_DIALECT = _a.DB_DIALECT;
// Si pas de variables d'environement, on lève une erreur
if (!DB_USER || !DB_PWD || !DB_NAME || !DB_HOST || !DB_PORT || !DB_DIALECT) {
    throw new Error('Please provide env variables.');
}
// Configuration de sequelize pour se connecter à la base de données
var commonConfig = {
    username: DB_USER,
    password: DB_PWD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
};
// Export de la configuration
module.exports = {
    development: __assign(__assign({}, commonConfig), { ssl: true }),
    test: commonConfig,
    production: __assign(__assign({}, commonConfig), { ssl: true })
};
