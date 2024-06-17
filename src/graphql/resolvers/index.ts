const db = require("../../models");
import { GraphQLError } from 'graphql';


const resolvers = {
    Query: {
        getProducts: async (parent: any, args: any, context:any, info:any) => {
            const products = await db.Product.findAll();
            if (products.length === 0) {
                throw new GraphQLError("No products found", {
                    extensions: { code: 'NOT_FOUND' },
                  });
            }
            return products;
        },
        getProduct:  async (parent: any, args: any, context:any, info:any) => {
            const product = db.Product.findByPk(args.id);
            if (!product) {
                throw new GraphQLError("Product not found", {
                    extensions: { code: 'NOT_FOUND' },
                  });
            }
            return product;
        },
    },
}

module.exports = resolvers;