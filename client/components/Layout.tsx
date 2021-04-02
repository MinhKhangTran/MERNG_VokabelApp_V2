import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <Box>
      <Box bgGradient="linear(to-r,yellow.200,orange.300)" p={4}>
        <Flex w="90%" mx="auto">
          <Heading color="orange.700">MyVocs</Heading>
          <Spacer />
          <Text fontSize="2xl" cursor="pointer">
            Login
          </Text>
        </Flex>
      </Box>
      <Box w={{ base: "90%", md: "75%" }} mx="auto">
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
