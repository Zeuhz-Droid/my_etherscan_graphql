const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");
const EtherDataSource = require("./datasource/ethDatasource");
const typeDefs = importSchema("./schema.graphql");

// Load environment variables from .env file
require("dotenv").config();

const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) =>
      // Call etherBalanceByAddress method on ethDataSource
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) =>
      // Call totalSupplyOfEther method on ethDataSource
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) =>
      // Call getLatestEthereumPrice method on ethDataSource
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) =>
      // Call getBlockConfirmationTime method on ethDataSource
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    // Instantiate EtherDataSource
    ethDataSource: new EtherDataSource(),
  }),
});

// Set timeout to 0 (no timeout)
server.timeout = 0;

// Start server on port 9000
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
