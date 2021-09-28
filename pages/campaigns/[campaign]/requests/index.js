import { Button } from "@chakra-ui/button";
import {
  Badge,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/layout";
import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/stat";

import { useRouter } from "next/router";
import React from "react";
import Campaign from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";

const RequestIndex = ({ requests, address, approversCount, requestCount }) => {
  const router = useRouter();

  return (
    <Container overflow="hidden" px={6} maxW="container.xl" py={4}>
      <Heading mb={10} size="xl" color="white" as="h3">
        Requests
      </Heading>
      <Button
        mb={5}
        onClick={() => router.push(`/campaigns/${address}/requests/new`)}
        borderRadius="lg"
        boxShadow="xl"
        fontSize="13px"
        colorScheme="blue"
      >
        Add Request
      </Button>
      <SimpleGrid columns={[1, 3]} spacing={5}>
        {requests.map((request, i) => {
          const onApprove = async () => {
            const campaign = Campaign(address);

            const accounts = await web3.eth.getAccounts();
            await campaign.methods.approveRequest(i).send({
              from: accounts[0],
            });
          };
          const onFinalize = async () => {
            const campaign = Campaign(address);

            const accounts = await web3.eth.getAccounts();
            await campaign.methods.finalizeRequest(i).send({
              from: accounts[0],
            });
          };

          return (
            <Flex
              key={i}
              color={request.complete ? "whiteAlpha.600" : "white"}
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
              <Stack spacing={4}>
                <Heading fontSize="16px" as="h4">
                  <Badge
                    mr={2}
                    color="white"
                    px="2"
                    colorScheme="blue"
                    borderRadius="full"
                  >
                    ID: {i}
                  </Badge>
                  {request.description}
                </Heading>
                <Divider />
                <Stat>
                  <StatLabel>Request Amount</StatLabel>
                  <StatNumber>
                    {web3.utils.fromWei(request.value, "ether")} Either
                  </StatNumber>
                  <StatHelpText>Recipient : {request.recipient}</StatHelpText>
                </Stat>

                <Divider />
                <Stat>
                  <StatLabel>Approval Count </StatLabel>
                  <StatNumber>
                    {request.approvalsCount}/{approversCount}
                  </StatNumber>
                  <StatHelpText>
                    Approval count must be at least 50%
                  </StatHelpText>
                </Stat>
                <Divider />
                <Flex justify="center">
                  <HStack>
                    <Button
                      isDisabled={request.complete}
                      fontSize="sm"
                      colorScheme="green"
                      onClick={onApprove}
                    >
                      Approve
                    </Button>
                    <Button
                      isDisabled={request.complete}
                      fontSize="sm"
                      colorScheme="red"
                      onClick={onFinalize}
                    >
                      Finalise
                    </Button>
                  </HStack>
                </Flex>
              </Stack>
            </Flex>
          );
        })}
      </SimpleGrid>
    </Container>
  );
};

export default RequestIndex;

export async function getServerSideProps({ params }) {
  const campaign = Campaign(params.campaign);
  const requestsCount = await campaign.methods.getRequestsCount().call();
  const approversCount = await campaign.methods.approversCount().call();

  const requests = await Promise.all(
    Array(parseInt(requestsCount))
      .fill()
      .map((el, index) => {
        return campaign.methods.requests(index).call();
      })
  );

  const sanitizedRequests = requests.map(
    ({ description, value, recipient, complete, approvalsCount }) => {
      return { description, value, recipient, complete, approvalsCount };
    }
  );
  console.log(sanitizedRequests);

  return {
    props: {
      address: params.campaign,
      requests: sanitizedRequests || [],
      approversCount,
      requestCount: sanitizedRequests.length || 0,
    },
  };
}
