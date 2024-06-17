'use strict';
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var process = require('process');
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/config.js')[env];
var db = {};
var sequelize;
// on se connecte à la base de données avec la configuration de sequelize
sequelize = new Sequelize(config.database, config.username, config.password, config);
// on récupère tous les modèles de sequelize qui se trouvent dans le dossier courant
fs
    .readdirSync(__dirname)
    .filter(function (file) {
    return (file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js' &&
        file.indexOf('.test.js') === -1);
})
    .forEach(function (file) {
    var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
});
// on parcourt tous les modèles pour vérifier s'il y a une méthode "associate"
Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        // si la méthode existe, on l'appelle avec l'objet db en paramètre
        // cette méthode permettra de définir les associations entre les modèles
        db[modelName].associate(db);
    }
});
// on ajoute sequelize et Sequelize à l'objet db
// sequelize permettra d'utiliser les méthodes de sequelize
// Sequelize permettra d'utiliser les types de données de sequelize
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
