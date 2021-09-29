import { Container, Heading, Flex, Divider } from "@chakra-ui/react";
import Header from "../components/Header";
import factory from "../ethereum/factory";
import { useRouter } from "next/router";
import ProjectCard from "../components/ProjectCard";
import fetchCampaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";

export default function Home({ sanitizedCampaign, Deployedcampaigns }) {
  console.log(Deployedcampaigns);
  return (
    <Container px={[5, 6]} maxW="container.xl" py={4}>
      <Header />
      <Divider my={10} />
      <Flex justify="center" direction="column">
        <Heading as="h3" color="white" mb={10}>
          Campaign available
        </Heading>
        <ProjectCard
          address={Deployedcampaigns}
          campaigns={sanitizedCampaign}
        />
      </Flex>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const Deployedcampaigns = await factory.methods.getDeployedCampaigns().call();

  const campaigns = await Promise.all(
    Deployedcampaigns.map((address, index) => {
      const campaign = fetchCampaign(address);
      return campaign.methods.getSummary().call();
    })
  );
  const sanitizedCampaign = campaigns.map((campaign) => {
    return {
      minimumContribution: campaign[0],
      balance: campaign[1],
      requestsCount: campaign[2],
      approversCount: campaign[3],
      manager: campaign[4],
      name: campaign[5],
      description: campaign[6],
      imageUrl: campaign[7],
    };
  });

  console.log(sanitizedCampaign);

  return {
    props: {
      sanitizedCampaign,
      Deployedcampaigns,
    },
  };
}
