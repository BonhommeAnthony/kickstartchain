import { Container, Heading, Flex, VStack } from "@chakra-ui/react";

import Link from "next/link";
import Header from "../components/Header";

import factory from "../ethereum/factory";

export default function Home({ campaigns }) {
  return (
    <Container maxW="container.xl" px={10} py={4}>
      <Header />
      <Flex bg="white">
        <Flex
          justifyContent="space-around"
          direction={["column-reverse", "column-reverse", "row"]}
        >
          <VStack>
            {campaigns.map((address, i) => {
              return (
                <Flex
                  direction="column"
                  w="xl"
                  fontSize="sm"
                  borderRadius="md"
                  boxShadow="xl"
                  key={i}
                  p={4}
                >
                  <Heading fontSize="sm" as="h4">
                    {address}
                  </Heading>
                  <Link href="/">View Campaign</Link>
                </Flex>
              );
            })}
          </VStack>
        </Flex>
      </Flex>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return {
    props: {
      campaigns,
    },
  };
}
