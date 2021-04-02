//Chakra
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import Layout from "components/Layout";
import { theme } from "../styles/theme";

//Apollo
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apollo";

const MyApp = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider options={{ useSystemColorMode: true }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ColorModeProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default MyApp;
