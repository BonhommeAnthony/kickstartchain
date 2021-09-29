import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightAddon } from "@chakra-ui/input";
import { Container, Heading, Text, VStack } from "@chakra-ui/layout";
import { toast, useToast } from "@chakra-ui/toast";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Campaign from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";
import { FiArrowLeft } from "react-icons/fi";

const RequestNew = () => {
  const router = useRouter();
  const toast = useToast();
  const address = router.query.campaign;

  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [recipient, setRecipient] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const campaign = Campaign(address);
    setLoading(true);

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({
          from: accounts[0],
        });
      router.push(`/campaigns/${address}/requests`);
      toast({
        title: "Congratulation!",
        description: " You create a new request !",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  return (
    <Container px={6} maxW="container.xl" py={4}>
      <Heading mb={5} size="xl" color="white" as="h3">
        New Request
      </Heading>
      <Button
        onClick={() => router.push(`/campaigns/${address}/requests`)}
        mb={5}
        leftIcon={<FiArrowLeft />}
        colorScheme="blue"
        fontSize="sm"
      >
        Back
      </Button>
      <VStack
        justify="center"
        bg="whiteAlpha.500"
        backdropBlur="blur(64px)"
        borderStyle="inset"
        borderRadius="md"
        boxShadow="xl"
        p={8}
        w="full"
        spacing={10}
      >
        <Heading size="xl" color="white" as="h3">
          Create a Request
        </Heading>
        <Text color="white">
          Create a Request for this campaign !(Only manager can create request)
        </Text>
        <form onSubmit={onSubmit}>
          <VStack spacing={10}>
            <FormControl>
              <FormLabel color="white">Description</FormLabel>
              <Input
                isRequired
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                backgroundColor="whiteAlpha.600"
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormLabel color="white">Amount in Either</FormLabel>
              <InputGroup>
                <Input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  backgroundColor="whiteAlpha.600"
                  type="number"
                />
                <InputRightAddon>Either</InputRightAddon>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel color="white">
                Recipient (This is where the money is going if the request is
                approved)
              </FormLabel>
              <InputGroup>
                <Input
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  backgroundColor="whiteAlpha.600"
                  type="text"
                />
                <InputRightAddon>Address</InputRightAddon>
              </InputGroup>
            </FormControl>
            <Button
              isDisabled={value <= 0 ? true : false}
              isLoading={loading}
              loadingText="Submitting"
              type="submit"
              colorScheme="blue"
              size="lg"
              fontSize="sm"
            >
              Create !
            </Button>
          </VStack>
        </form>
      </VStack>
    </Container>
  );
};

export default RequestNew;
