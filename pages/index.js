import { Container, Heading, Flex, VStack } from "@chakra-ui/react";

import Link from "next/link";
import Header from "../components/Header";

import factory from "../ethereum/factory";

export default function Home({ campaigns }) {
  return (
    <Container px={[4, 0]} overflow="hidden" maxW="container.xl" py={4}>
      <Header />
      <Flex
        justifyContent="space-around"
        direction={["column-reverse", "column-reverse", "row"]}
      >
        {campaigns.map((address, i) => {
          return (
            <Flex
              bg="whiteAlpha.700"
              direction="column"
              fontSize="13px"
              borderRadius="md"
              boxShadow="xl"
              key={i}
              p={4}
            >
              <Heading fontSize="16px" as="h4">
                {address}
              </Heading>
              <Link href="/">View Campaign</Link>
            </Flex>
          );
        })}
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
