const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const fs = require('fs');

// Some fake data
const products = require('./products.json');

// The GraphQL schema in string form
const typeDefs = `
  type Query { 
  	products: [Product]
  	product(sku: String!):Product
  }
  type Product { name: String, image: String, image_alt: String, price: Float, sku: String, price_sale: Float }
  type Mutation {
  	createProduct( name: String!, image: String!, image_alt: String!, price: Float!, sku: String!, price_sale: Float! ): Product
  	deleteProduct(sku: String!): Product
  	updateProduct(sku: String!): Product
  }
`;

// The resolvers
const resolvers = {
  Query: { 
  	products: () => products
  },
  Mutation: {
  	createProduct: (root, args) => {
  		let old_data = products;
  		let new_data = {
  			name: args.name,
  			image: args.image,
  			image_alt: args.image_alt,
  			price: args.price,
  			sku: args.sku,
  			price_sale: args.price_sale
  		};
  		old_data.push(new_data);
  		console.log(old_data);
  		fs.writeFile("products.json", JSON.stringify(old_data));
  	},
  	deleteProduct: (root, args) => {
  		let newdata = products.filter(obj => obj.sku !== args.sku);
  		fs.writeFile("products.json", JSON.stringify(newdata));
  	},
  	updateProduct: (root, args) => {

  	}
  }
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialize the app
const app = express();

app.use('/admin', bodyParser.json(), graphqlExpress({ schema }));

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(5000, () => {
  console.log('Go to http://localhost:5000/graphiql to run queries!');
});