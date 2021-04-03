import { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Heading,
  Text,
  InputGroup,
  InputRightElement,
  IconButton,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// Formik und yup
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "authContext";

const Register = () => {
  const { registerLoading, user, signUp } = useAuth();
  const router = useRouter();
  const [showPW, setShowPW] = useState(false);
  const formik = useFormik({
    initialValues: { username: "", email: "", password: "" },
    validationSchema: Yup.object({
      username: Yup.string().required("Ein Benutzername ist nötig!"),
      email: Yup.string().email().required("Eine Email ist nötig!"),
      password: Yup.string()
        .required("Ein Passwort ist nötig!")
        .min(6, "mindestens 6 Zeichen!"),
    }),
    onSubmit: (daten, { resetForm }) => {
      //   console.log(daten);
      signUp(daten.email, daten.username, daten.password);
      router.push("/");

      resetForm();
    },
  });

  return (
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
        Anmeldung
      </Heading>
      <form onSubmit={formik.handleSubmit}>
        {/* Email */}
        <FormControl
          isInvalid={!!formik.errors.username && formik.touched.username}
          id="username"
          mt={4}
        >
          <FormLabel
            bgGradient="linear(to-l,yellow.200,orange.300)"
            bgClip="text"
          >
            Benutzername
          </FormLabel>
          <Input
            variant="flushed"
            type="text"
            placeholder="Benutzername"
            {...formik.getFieldProps("username")}
          />

          <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
        </FormControl>
        {/* Email */}
        <FormControl
          isInvalid={!!formik.errors.email && formik.touched.email}
          id="email"
          mt={4}
        >
          <FormLabel
            bgGradient="linear(to-l,yellow.200,orange.300)"
            bgClip="text"
          >
            E-Mail
          </FormLabel>
          <Input
            variant="flushed"
            type="email"
            placeholder="E-Mail Adresse"
            {...formik.getFieldProps("email")}
          />

          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>

        {/* Password */}
        <FormControl
          isInvalid={!!formik.errors.password && formik.touched.password}
          id="password"
          mt={4}
        >
          <FormLabel
            bgGradient="linear(to-l,yellow.200,orange.300)"
            bgClip="text"
          >
            Password
          </FormLabel>
          <InputGroup>
            <Input
              variant="flushed"
              type={showPW ? "text" : "password"}
              placeholder="******"
              {...formik.getFieldProps("password")}
            />
            <InputRightElement width="4.5rem">
              <IconButton
                aria-label="hide/show password"
                onClick={() => setShowPW(!showPW)}
                variant="ghost"
                colorScheme="orange"
                h="1.75rem"
              >
                {showPW ? <FaEyeSlash /> : <FaEye />}
              </IconButton>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>

        <Button
          isLoading={registerLoading}
          mt={8}
          colorScheme="orange"
          type="submit"
        >
          Anmelden
        </Button>
        <Text mt={4} fontStyle="italic">
          Schon ein Account?{" "}
          <Link href="/login">
            <Text
              as="span"
              cursor="pointer"
              bgGradient="linear(to-l,orange.400,orange.600)"
              bgClip="text"
            >
              hier klicken
            </Text>
          </Link>{" "}
          um sich einzuloggen!
        </Text>
      </form>
    </Box>
  );
};

export default Register;
