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
  IconButton,
  Button,
} from "@chakra-ui/react";
import { useRead_VoksQuery } from "lib/graphql/readVoks.graphql";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
import { useAuth } from "authContext";
import { useDelete_VokMutation } from "lib/graphql/deleteVok.graphql";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { READ_VOKS_QUERY } from "./add";

//for updating need gql
const DELETE_VOK_MUTATION = gql`
  mutation DELETE_VOK_MUTATION($vokId: ObjectId!) {
    deleteVok(vokId: $vokId)
  }
`;

function update(cache, payload) {
  console.log(cache.evict);
  console.log(payload.data.deleteVok);
  cache.evict(cache.identify(payload.data.deleteVok));
}

const HomePage = () => {
  const { data, loading, error } = useRead_VoksQuery();
  const { user } = useAuth();
  //delete
  const [deleteVok] = useMutation(DELETE_VOK_MUTATION);

  //for deleting

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
      {user && (
        <Button colorScheme="orange">
          <Link href="/add">Neue Vokabel hinzufügen</Link>
        </Button>
      )}

      {/* Table */}
      <Table mt={4} variant="simple">
        <Thead>
          <Tr>
            <Th color="orange.500">Deutsch 🇩🇪</Th>
            <Th color="orange.500">Koreanisch 🇰🇷</Th>
            <Th color="orange.500">Benutzer 🧍🏻</Th>
            {user && <Th></Th>}
          </Tr>
        </Thead>
        {data.readVocs.length === 0 ? (
          <Text>
            Es gibt noch keine Vokabeln. Melde dich an und erstelle welche 🥲
          </Text>
        ) : (
          <Tbody>
            {data.readVocs.map((vok) => {
              return (
                <>
                  <Tr key={vok._id}>
                    <Td color="orange.300">
                      <Text casing="capitalize">{vok.deutsch}</Text>
                    </Td>
                    <Td color="orange.300">{vok.koreanisch}</Td>
                    <Td color="orange.300">
                      <Text casing="capitalize">{vok.creator.username}</Text>
                    </Td>
                    {user && (
                      <Td>
                        <Button colorScheme="orange">
                          <Link href={`/${vok._id}`}>🕵🏻</Link>
                        </Button>
                      </Td>
                    )}

                    {/* {user?._id === vok.creator._id && (
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
                        <MenuItem
                          color="red.400"
                          onClick={() => {
                            if (confirm("Bist du dir sicher?")) {
                              deleteVok({
                                variables: { vokId: vok._id },
                                update,
                              });
                            }
                          }}
                        >
                          🙅‍♂️ Löschen
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  )} */}
                  </Tr>
                </>
              );
            })}
          </Tbody>
        )}
      </Table>
    </Box>
  );
};

export default HomePage;
