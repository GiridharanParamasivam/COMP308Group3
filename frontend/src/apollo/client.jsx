import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
    link: new HttpLink({
        uri: "http://localhost:5000/graphql",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token here
        },
    }),
    cache: new InMemoryCache(),
});

export default client;
