import React from "react";
import {GetServerSideProps} from "next";
import {Stack, Button, Box, Text, Image} from "@chakra-ui/react";

import api from "../product/api";
import {Product} from "../product/types";

interface Props {
  result: Product;
}

const IndexPage: React.FC<Props> = ({result}) => {
  return (
    <Box padding={4}>
      <Stack backgroundColor="white" borderRadius={2} boxShadow="sm" padding={4} width="100%">
        <Stack direction={{base: "column", sm: "row"}} justifyContent="space-between">
          <Image height={256} src={result.image} width={256} />
          <Stack maxWidth={320}>
            <Text color="gray.500" fontSize="sm">
              Estado - Vendidos
            </Text>
            <Text fontSize="2xl" fontWeight="bold">
              {result.title}
            </Text>
            <Text fontSize="4xl">
              {result.price.toLocaleString("es-AR", {style: "currency", currency: "ARS"})}
            </Text>
            <Button colorScheme="blue">Comprar</Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  const result = await api.fetch(query.id as string);

  return {
    props: {
      result,
    },
  };
};

export default IndexPage;
