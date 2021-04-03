import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Text,
  Spinner,
  ButtonGroup,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../authContext";
import { useRead_VokQuery } from "../lib/graphql/readVok.graphql";
import { useUpdate_VokMutation } from "../lib/graphql/updateVok.graphql";
import { useDelete_VokMutation } from "../lib/graphql/deleteVok.graphql";
import { useEffect, useState } from "react";
import { READ_VOKS_QUERY } from "./add";

//function to make first letter capital
const make1stBig = (vokabel: string) => {
  const firstLetter = vokabel.slice(0, 1);
  const restLetter = vokabel.slice(1);
  //   console.log(firstLetter, restLetter);
  return firstLetter.toUpperCase().concat(restLetter);
};

const VokDetail = ({ id }) => {
  const { user } = useAuth();
  const { data, loading, error } = useRead_VokQuery({
    variables: { vokId: id },
  });
  console.log(make1stBig("pferd"));
  //update
  const [updateVokMutation] = useUpdate_VokMutation();
  //delete
  const [deleteVokMutation] = useDelete_VokMutation();
  //other stuffs
  const [formData, setFormData] = useState({ deutsch: "", koreanisch: "" });
  const router = useRouter();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: Yup.object({
      deutsch: Yup.string().required("Ein deutsches Wort ist nötig!"),
      koreanisch: Yup.string().required("Ein koreanisches Wort ist nötig!"),
    }),
    onSubmit: (daten, { resetForm }) => {
      // console.log(daten);
      updateVokMutation({
        variables: {
          input: {
            _id: id,
            deutsch: daten.deutsch,
            koreanisch: daten.koreanisch,
          },
        },
        refetchQueries: [{ query: READ_VOKS_QUERY }],
      });
      router.push("/");
      resetForm();
    },
  });

  useEffect(() => {
    if (data) {
      setFormData({
        deutsch: make1stBig(data.readVoc.deutsch),
        koreanisch: data.readVoc.koreanisch,
      });
    }
  }, [data]);
  const onDelete = async (e) => {
    e.preventDefault();
    try {
      const { data } = await deleteVokMutation({
        variables: { vokId: id },
        refetchQueries: [{ query: READ_VOKS_QUERY }],
      });
      if (data.deleteVok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);
  if (loading)
    return (
      <Box mt={8}>
        <Spinner />
      </Box>
    );

  return (
    <Box mt={8}>
      <Button colorScheme="orange">
        <Link href="/">🔙 Zurück zur Übersicht </Link>
      </Button>

      <Box
        border="4px"
        borderColor="orange.400"
        p={10}
        mt={16}
        boxShadow="md"
        borderRadius="lg"
        w={{ base: "100%", md: "65%" }}
        mx="auto"
      >
        <Heading bgGradient="linear(to-l,yellow.200,orange.300)" bgClip="text">
          Vokabel
        </Heading>
        <form onSubmit={formik.handleSubmit}>
          {/* Deutsch */}
          <FormControl
            isInvalid={!!formik.errors.deutsch && formik.touched.deutsch}
            id="deutsch"
            mt={4}
          >
            <FormLabel
              bgGradient="linear(to-l,yellow.200,orange.300)"
              bgClip="text"
            >
              Deutsch
            </FormLabel>
            <Input
              variant="flushed"
              type="text"
              placeholder="Deutsch"
              isDisabled={user?._id !== data.readVoc.creator._id}
              {...formik.getFieldProps("deutsch")}
            />

            <FormErrorMessage>{formik.errors.deutsch}</FormErrorMessage>
          </FormControl>
          {/* Koreanisch */}
          <FormControl
            isInvalid={!!formik.errors.koreanisch && formik.touched.koreanisch}
            id="koreanisch"
            mt={4}
          >
            <FormLabel
              bgGradient="linear(to-l,yellow.200,orange.300)"
              bgClip="text"
            >
              Koreanisch
            </FormLabel>
            <Input
              isDisabled={user?._id !== data.readVoc.creator._id}
              variant="flushed"
              type="text"
              placeholder="Koreanisch"
              {...formik.getFieldProps("koreanisch")}
            />

            <FormErrorMessage>{formik.errors.koreanisch}</FormErrorMessage>
          </FormControl>

          {user?._id === data.readVoc.creator._id ? (
            <Text mt={4} casing="capitalize">
              Von dir
            </Text>
          ) : (
            <Text mt={4} casing="capitalize">
              Von {data.readVoc.creator.username}
            </Text>
          )}

          {user?._id === data.readVoc.creator._id && (
            <ButtonGroup>
              <Button mt={8} colorScheme="green" type="submit">
                ✍️ Ändern
              </Button>
              <Button
                mt={8}
                colorScheme="red"
                type="button"
                onClick={(e) => {
                  if (confirm("Bist du dir sicher?")) {
                    onDelete(e);
                  }
                }}
              >
                🙅‍♂️ Löschen
              </Button>
            </ButtonGroup>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default VokDetail;

VokDetail.getInitialProps = ({ query: { id } }) => {
  return { id };
};
