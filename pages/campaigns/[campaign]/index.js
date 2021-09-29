import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import {
  Badge,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/layout";
import { useRouter } from "next/router";
import React from "react";
import ContributeForm from "../../../components/ContributeForm";
import fetchCampaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";

const Campaign = ({ summary }) => {
  const router = useRouter();
  const campaignAddress = router.query.campaign;
  const infos = [
    {
      header: summary.manager,
      meta: "address of manager",
      description:
        "The manager created this campaign and can create requests to withdraw money.",
    },
    {
      header: `${summary.minimumContribution} wei`,
      meta: "Minimum Contribution (wei)",
      description:
        "You must contribute at least this much wei to become a approver.",
    },
    {
      header: summary.requestsCount,
      meta: "Number of Requests",
      description:
        "A request tries to withdraw money from the contract. Requests must be approved by approvers.",
    },
    {
      header: summary.approversCount,
      meta: "Number of Approvers",
      description:
        "Number of people who have already donated to this campaign.",
    },
    {
      header: `${web3.utils.fromWei(summary.balance, "ether")} ether`,
      meta: "Campaign Balance (ether)",
      description:
        "The balance is how much money this campaign has left to spend.",
    },
  ];

  return (
    <Container px={6} maxW="container.xl" py={4}>
      <Heading
        textTransform="uppercase"
        mb={10}
        size="lg"
        color="white"
        as="h3"
      >
        {summary.name}
      </Heading>
      <Text color="white" fontWeight="bold">
        {summary.description}
      </Text>
      <Text color="white" mt={4}>
        Campaign balance
        <Badge borderRadius="full" colorScheme="blue" ml={1}>
          {" "}
          {web3.utils.fromWei(summary.balance, "ether")} Ether
        </Badge>
      </Text>
      <Divider my={10} />
      <SimpleGrid spacingX={[0, 10]} spacing={10} columns={[1, 3]}>
        <GridItem colSpan={2}>
          <SimpleGrid columns={[1, 2]} spacing={5}>
            <GridItem colSpan={[1, 2]}>
              <Image
                borderRadius="lg"
                src={summary.imageUrl}
                alt={summary.name}
              />
            </GridItem>
            {infos.map((info, i) => {
              return (
                <Flex
                  color="white"
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
                  <Stack spacing={4}>
                    <Badge
                      color="white"
                      px="2"
                      colorScheme="blue"
                      borderRadius="full"
                    >
                      {info.meta}
                    </Badge>
                    <Heading fontSize="13px" as="h4">
                      {info.header}
                    </Heading>
                    <Divider />
                    <Text fontWeight="bold">{info.description}</Text>
                  </Stack>
                </Flex>
              );
            })}
            <Flex
              color="white"
              bg="whiteAlpha.400"
              backdropBlur="blur(64px)"
              borderTop="1px"
              borderLeft="1px"
              borderStyle="inset"
              direction="column"
              fontSize="13px"
              borderRadius="md"
              boxShadow="xl"
              p={4}
            >
              <Stack spacing={6}>
                <Badge
                  color="white"
                  px="2"
                  colorScheme="blue"
                  borderRadius="full"
                >
                  All requests
                </Badge>
                <Text fontWeight="bold">
                  All the requests available for this campaign.
                </Text>
                <Divider />
                <Button
                  onClick={() =>
                    router.push(`/campaigns/${campaignAddress}/requests`)
                  }
                  borderRadius="lg"
                  boxShadow="xl"
                  fontSize="13px"
                  colorScheme="blue"
                >
                  View all Requests
                </Button>
              </Stack>
            </Flex>
          </SimpleGrid>
        </GridItem>
        <GridItem>
          <ContributeForm campaignAddress={campaignAddress} />
        </GridItem>
      </SimpleGrid>
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
        name: summary[5],
        description: summary[6],
        imageUrl: summary[7],
      },
    },
  };
}
