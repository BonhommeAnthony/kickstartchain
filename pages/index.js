import { Container, Heading, Flex, Divider } from "@chakra-ui/react";
import Header from "../components/Header";
import factory from "../ethereum/factory";
import { useRouter } from "next/router";
import ProjectCard from "../components/ProjectCard";

export default function Home({ campaigns }) {
  return (
    <Container px={[5, 6]} maxW="container.xl" py={4}>
      <Header />
      <Divider my={10} />
      <Flex justify="center" direction="column">
        <Heading as="h3" color="white" mb={10}>
          Campaign available
        </Heading>
        <ProjectCard campaigns={campaigns} />
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
