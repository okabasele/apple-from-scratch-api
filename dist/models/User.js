"use strict";
module.exports = function (sequelize, DataTypes) {
    var Product = sequelize.define('Product', {
        name: DataTypes.STRING,
        type: DataTypes.STRING,
        url: DataTypes.STRING,
        image: DataTypes.STRING,
        price: DataTypes.INTEGER
    }, {
        // nom de la table en base de données
        tableName: 'products',
        //Garder la nomination de la table sans la modifier
        freezeTableName: true,
        // Utiliser la colonne createdAt et updatedAt
        timestamps: true
    });
    return Product;
};
