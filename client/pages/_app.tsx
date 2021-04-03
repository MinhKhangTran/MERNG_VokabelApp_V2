//Chakra
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import Layout from "components/Layout";
import { theme } from "../styles/theme";

//Apollo
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apollo";
import { AuthProvider } from "authContext";

const MyApp = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider options={{ useSystemColorMode: true }}>
          <AuthProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthProvider>
        </ColorModeProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default MyApp;
