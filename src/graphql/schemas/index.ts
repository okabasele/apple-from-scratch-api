const typeDefs = `
        type Product {
            id: ID!
            name: String!
            type: String!
            url: String!
            image: String!
            price: Int!
        }
        type Query {
            getProducts(): [Product]!
            getProduct(id: ID!): Product
        }
    `;

module.exports = typeDefs;