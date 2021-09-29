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

const ProjectCard = ({ campaigns, address }) => {
  const router = useRouter();
  const [summary, setSummary] = useState("");
  return (
    <SimpleGrid columns={[1, 4]} spacing={5}>
      {campaigns.map((campaign, i) => {
        console.log(campaign);
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
                height="200px"
                borderRadius="lg"
                src={campaign.imageUrl}
                alt={campaign.name}
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
                  {campaign.name}
                </Heading>
              </Flex>
              <Divider />
              <Text fontWeight="bold" fontSize="sm">
                {campaign.description}
              </Text>
              <Divider />
              <Text fontWeight="bold" fontSize="sm">
                Minimum contribution :{" "}
                <Badge borderRadius="full" px="2" colorScheme="blue">
                  {campaign.minimumContribution}
                  wei
                </Badge>
              </Text>
              <Divider />
              <Button
                onClick={() => router.push(`/campaigns/${address[i]}`)}
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
