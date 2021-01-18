import React from "react";
import {GetServerSideProps} from "next";
import {Stack, Box, Text} from "@chakra-ui/react";
import Link from "next/link";

import api from "../product/api";
import {Product} from "../product/types";

interface Props {
  results: Product[];
}

const IndexPage: React.FC<Props> = ({results}) => {
  return (
    <Box padding={4}>
      <Stack backgroundColor="white" borderRadius={2} boxShadow="sm" padding={4} width="100%">
        {results.map((product) => (
          <Link key={product.id} href={`/${product.id}`}>
            <a>
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row">
                  <Box
                    backgroundColor="gray.50"
                    backgroundImage={`url(${product.image})`}
                    backgroundPosition="center"
                    backgroundRepeat="no-repeat"
                    backgroundSize="contain"
                    borderRadius="sm"
                    height={180}
                    minHeight={180}
                    minWidth={180}
                    width={180}
                  />
                  <Stack>
                    <Text fontSize="2xl" fontWeight={500}>
                      {product.price.toLocaleString("es-AR", {style: "currency", currency: "ARS"})}
                    </Text>
                    <Text>{product.title}</Text>
                  </Stack>
                </Stack>
                <Text fontSize="sm">{product.location}</Text>
              </Stack>
            </a>
          </Link>
        ))}
      </Stack>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  const results = await api.search(query.q as string);

  return {
    props: {
      results,
    },
  };
};

export default IndexPage;
