import { Container, Heading } from "@chakra-ui/layout";
import React from "react";
import fetchCampaign from "../../ethereum/campaign";

const Campaign = ({ summary }) => {
  console.log(summary);
  return (
    <Container px={6} maxW="container.xl" py={4}>
      <Heading mb={10} size="2xl" color="white" as="h3">
        Campaign contract :
      </Heading>
    </Container>
  );
};

export default Campaign;

export async function getServerSideProps({ params }) {
  const campaign = fetchCampaign(params.campaign);
  const summary = await campaign.methods.getSummary().call();
  return {
    props: {
      summary: {
        minimumContribution: summary[0],
        balance: summary[1],
        requestsCount: summary[2],
        approversCount: summary[3],
        manager: summary[4],
      },
    },
  };
}
