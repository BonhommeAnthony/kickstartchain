import React from "react";
import ProjectCard from "../components/ProjectCard";
import { Container, Heading, Flex } from "@chakra-ui/react";
import factory from "../ethereum/factory";
import fetchCampaign from "../ethereum/campaign";

const allCampaigns = ({ Deployedcampaigns, sanitizedCampaign }) => {
  return (
    <Container px={[5, 6]} maxW="container.xl" py={4}>
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
};

export default allCampaigns;

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

  return {
    props: {
      sanitizedCampaign,
      Deployedcampaigns,
    },
  };
}
