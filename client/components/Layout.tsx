import { Avatar, Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { useAuth } from "authContext";
import Link from "next/link";

const Layout = ({ children }) => {
  const { user, signOut } = useAuth();
  return (
    <Box>
      <Box bgGradient="linear(to-r,yellow.200,orange.300)" p={4}>
        <Flex w="90%" mx="auto">
          <Heading color="orange.700">
            <Link href="/">MyVocs</Link>
          </Heading>
          <Spacer />
          {!user ? (
            <Text fontSize="2xl" cursor="pointer">
              <Link href="/login">Login</Link>
            </Text>
          ) : (
            <Flex align="center">
              <Text casing="capitalize" fontSize="2xl" mr={4}>
                Hi {user.username}
              </Text>
              <Text fontSize="2xl" cursor="pointer" onClick={() => signOut()}>
                Logout
              </Text>
            </Flex>
          )}
        </Flex>
      </Box>
      <Box w={{ base: "90%", md: "75%" }} mx="auto">
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
