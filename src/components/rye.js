import { ApolloClient, InMemoryCache } from '@apollo/client';

const apiKey = "<RYE_API_KEY>";
export const apolloClient = new ApolloClient({
  uri: "https://graphql.api.rye.com/v1/query",
  cache: new InMemoryCache(),
  connectToDevTools: true,
  headers: {
    Authorization: 'Basic ' + btoa(apiKey + ':'),
    'rye-shopper-ip': '<IP_ADDRESS>',
  },
});
