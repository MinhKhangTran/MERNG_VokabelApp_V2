import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  Heading,
  Spinner,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { useRead_VoksQuery } from "lib/graphql/readVoks.graphql";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";

const HomePage = () => {
  const { data, loading, error } = useRead_VoksQuery();
  // console.log(data);
  if (loading)
    return (
      <Box mt={8}>
        <Spinner />
      </Box>
    );
  if (error)
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Es gab ein Fehler 🥲</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
        <CloseButton position="absolute" right="8px" top="8px" />
      </Alert>
    );
  return (
    <Box mt={8}>
      <Button colorScheme="orange">
        <Link href="/add">Neue Vokabel hinzufügen</Link>
      </Button>
      {/* Table */}
      <Table mt={4} variant="simple">
        <Thead>
          <Tr>
            <Th color="orange.500">Deutsch 🇩🇪</Th>
            <Th color="orange.500">Koreanisch 🇰🇷</Th>
            <Th color="orange.500">Benutzer 🧍🏻</Th>
            {/* <Th></Th> */}
          </Tr>
        </Thead>
        <Tbody>
          {data.readVocs.map((vok) => {
            return (
              <>
                <Tr key={vok._id}>
                  <Td color="orange.300">{vok.deutsch}</Td>
                  <Td color="orange.300">{vok.koreanisch}</Td>
                  <Td color="orange.300">
                    <Text casing="capitalize">{vok.creator.username}</Text>
                  </Td>
                  {/* <Td>
                  <ButtonGroup>
                    <Button colorScheme="green">✍️</Button>
                    <Button colorScheme="red">🙅‍♂️</Button>
                  </ButtonGroup>
                </Td> */}

                  {/* <IconButton
                  right="1%"
                  mt={2}
                  position="absolute"
                  variant="ghost"
                  colorScheme="orange"
                  aria-label="setting"
                  icon={<BsThreeDotsVertical />}
                /> */}

                  <Menu>
                    <MenuButton
                      mt={2}
                      as={IconButton}
                      aria-label="Settings"
                      icon={<BsThreeDotsVertical />}
                      variant="ghost"
                      colorScheme="orange"
                    />
                    <MenuList bg="orange.100" borderColor="orange.400">
                      <MenuItem color="green.400">✍️ Ändern</MenuItem>
                      <MenuItem color="red.400">🙅‍♂️ Löschen</MenuItem>
                    </MenuList>
                  </Menu>
                </Tr>
              </>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default HomePage;
