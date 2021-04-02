import { Box, Button, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddPage = () => {
  return (
    <Box mt={8}>
      <Button colorScheme="orange">
        <Link href="/">🔙 Zurück zur Übersicht </Link>
      </Button>
      <Text color="orange.400" mt={4}>
        Neue Vokabel hinzufügen
      </Text>
    </Box>
  );
};

export default AddPage;
