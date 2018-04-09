//Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const fs = require('fs');
var auth = require('./auth.js');

//Database Files
const products = require('./products.json');
const users = require('./users.json');

// GraphQL Schema
const typeDefs = `
  type Query { 
  	products: [Product]
  	sku_lookup(sku: String!): Product
    product(active: Boolean): [Product]
    users: [User]
    user(username: String!, password: String!): User
  }
  type Product { name: String, image: String, image_alt: String, price: Float, sku: String, price_sale: Float }
  type User { username: String, password: String, logged_in: Boolean}
  type Mutation {
  	createProduct( name: String!, image: String!, image_alt: String!, price: Float!, sku: String!, price_sale: Float!, active: Boolean! ): Product
  	deleteProduct( sku: String!): Product
  	updateProduct( sku: String!): Product
    createUser(username: String!, password: String!): User
  }
`;

const resolvers = {
  Query: { 
    products: () => { return products },
    sku_lookup: (root, args) => {
      return products.find(obj => obj.sku === args.sku);
    },
    product: (root, args) => {
      return products.filter(obj => obj.active === args.active);
    },
    user: (root, args) => {
      let a = users.find(obj => obj.username === args.username);
      if(a === undefined) {
        return;
      } else {
        logged_in = auth.login(args.password, a.password, a);
        return logged_in;
      }
    },
    users: () => { return users }
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
  			price_sale: args.price_sale,
        active: args.active
  		};
  		old_data.push(new_data);
  		fs.writeFile("products.json", JSON.stringify(old_data));
      return new_data;
  	},
  	deleteProduct: (root, args) => {
  		let newdata = products.filter(obj => obj.sku !== args.sku);
  		fs.writeFile("products.json", JSON.stringify(newdata));
  	},
  	updateProduct: (root, args) => {

  	},
    createUser: (root, args) => {
      let old_users = users;
      hash = auth.signup(args.password);
      hash.then(() => {
        let new_user = {
          username: args.username,
          password: hash,
          logged_in: false
        }
        old_users.push(new_user);
        fs.writeFile("users.json", JSON.stringify(old_users))
      })

    }
  }
};

//Put together the schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

//Run the server on Port: 5000, to be connected to React App through proxy.
const app = express();
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
app.listen(5000, () => {
  console.log('Server running!');
});