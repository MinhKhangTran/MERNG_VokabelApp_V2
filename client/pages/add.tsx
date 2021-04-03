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
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreate_VokMutation } from "lib/graphql/createVok.graphql";
import { useRead_VoksQuery } from "lib/graphql/readVoks.graphql";
import gql from "graphql-tag";
import { useAuth } from "authContext";
import { useEffect } from "react";

export const READ_VOKS_QUERY = gql`
  query READ_VOKS_QUERY {
    readVocs {
      _id
      deutsch
      koreanisch
      creator {
        _id
        username
        email
      }
    }
  }
`;

const AddPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [createVokMutation, { loading }] = useCreate_VokMutation();
  //for refetching

  const formik = useFormik({
    initialValues: { deutsch: "", koreanisch: "" },
    validationSchema: Yup.object({
      deutsch: Yup.string().required("Ein deutsches Wort ist nötig!"),
      koreanisch: Yup.string().required("Ein koreanisches Wort ist nötig!"),
    }),
    onSubmit: (daten, { resetForm }) => {
      // console.log(daten);
      createVokMutation({
        variables: { deutsch: daten.deutsch, koreanisch: daten.koreanisch },
        refetchQueries: [{ query: READ_VOKS_QUERY }],
      });
      router.push("/");
      resetForm();
    },
  });
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);
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
          Neue Vokabel hinzufügen
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
              variant="filled"
              type="text"
              placeholder="Deutsch"
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
              variant="filled"
              type="text"
              placeholder="Koreanisch"
              {...formik.getFieldProps("koreanisch")}
            />

            <FormErrorMessage>{formik.errors.koreanisch}</FormErrorMessage>
          </FormControl>

          <Button isLoading={loading} mt={8} colorScheme="orange" type="submit">
            Hinzufügen
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AddPage;
