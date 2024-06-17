"use strict";
var typeDefs = "\n        type Product {\n            id: ID!\n            name: String\n            type: String\n            url: String\n            image: String\n            price: Int\n        }\n        type Query {\n            getProducts: [Product]\n            getProduct(id: ID!): Product\n        }\n    ";
module.exports = typeDefs;
