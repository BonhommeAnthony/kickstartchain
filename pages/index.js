import { Container, Heading, Flex, Divider } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";

import Link from "next/link";
import Header from "../components/Header";

import factory from "../ethereum/factory";

export default function Home({ campaigns }) {
  return (
    <Container px={[5, 6]} maxW="container.xl" py={4}>
      <Header />
      <Divider my={10} />
      <Flex justify="center" direction="column">
        <Heading as="h3" color="white" mb={10}>
          All Campaign{" "}
        </Heading>
        <SimpleGrid columns={[1, 2]} spacing={5}>
          {campaigns.map((address, i) => {
            return (
              <Flex
                bg="whiteAlpha.400"
                backdropBlur="blur(64px)"
                borderTop="1px"
                borderLeft="1px"
                borderStyle="inset"
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
                <Link href={`/campaigns/${address}`}>View Campaign</Link>
              </Flex>
            );
          })}
        </SimpleGrid>
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
