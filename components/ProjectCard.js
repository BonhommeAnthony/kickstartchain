import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import {
  Badge,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/layout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import fetchCampaign from "../ethereum/campaign";

const ProjectCard = ({ campaigns }) => {
  const router = useRouter();
  return (
    <SimpleGrid columns={[1, 4]} spacing={5}>
      {campaigns.map((address, i) => {
        const [summary, setSummary] = useState("");
        useEffect(() => {
          const fetchSummary = async () => {
            const campaign = fetchCampaign(address);
            const summary = await campaign.methods.getSummary().call();
            setSummary({
              minimumContribution: summary[0],
              balance: summary[1],
              requestsCount: summary[2],
              approversCount: summary[3],
              manager: summary[4],
              name: summary[5],
              description: summary[6],
              imageUrl: summary[7],
            });
          };
          fetchSummary();
        }, []);

        return (
          <Flex
            bg="whiteAlpha.400"
            backdropBlur="blur(64px)"
            borderTop="1px"
            borderLeft="1px"
            borderStyle="inset"
            direction="column"
            fontSize="13px"
            borderRadius="lg"
            boxShadow="xl"
            key={i}
            p={4}
            color="white"
          >
            <Stack spacing={3}>
              <Image
                borderRadius="lg"
                src={summary.imageUrl}
                alt={summary.name}
              />
              <Flex alignItems="center">
                <Badge borderRadius="full" px="2" colorScheme="blue">
                  New
                </Badge>
                <Heading
                  textTransform="uppercase"
                  ml={1}
                  fontSize="16px"
                  as="h4"
                  fontWeight="semibold"
                  letterSpacing="wide"
                >
                  {summary.name}
                </Heading>
              </Flex>
              <Divider />
              <Text fontWeight="bold" fontSize="sm">
                {summary.description}
              </Text>
              <Divider />
              <Text fontWeight="bold" fontSize="sm">
                Minimum contribution :{" "}
                <Badge borderRadius="full" px="2" colorScheme="blue">
                  {summary.minimumContribution}
                  wei
                </Badge>
              </Text>
              <Divider />
              <Button
                onClick={() => router.push(`/campaigns/${address}`)}
                borderRadius="lg"
                boxShadow="xl"
                colorScheme="blue"
              >
                View Campaign
              </Button>
            </Stack>
          </Flex>
        );
      })}
    </SimpleGrid>
  );
};

export default ProjectCard;
