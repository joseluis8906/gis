import Vue from 'vue';
import ApolloClient, { createBatchingNetworkInterface } from 'apollo-client';
import VueApollo from 'vue-apollo';

const apolloClient = new ApolloClient({
  networkInterface: createBatchingNetworkInterface({
    //uri: 'https://api.graph.cool/simple/v1/ciwce5xw82kh7017179gwzn7q',
    uri: 'http://localhost:3000/graphql',
    dataIdFromObject: o => o.Id
  })
});

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

export default apolloProvider;
