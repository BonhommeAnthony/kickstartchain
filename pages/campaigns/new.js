import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightAddon } from "@chakra-ui/input";
import { Container, Heading, Flex, VStack, Text } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

const CampaignNew = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [minimumContribution, setminimumContribution] = useState("");

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const toast = useToast();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(minimumContribution, name, description, imageUrl)
        .send({
          from: accounts[0],
        });
      router.push("/");
      toast({
        title: "Congratulation!",
        description: " Your campaign has been created !",
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
      <Heading mb={10} size="2xl" color="white" as="h3">
        New Campaign !
      </Heading>
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
          Create Campaign
        </Heading>
        <Text color="white">
          Choose the Name, the Description, an Image and the minimum
          contribution in wei for your campaign!
        </Text>
        <form onSubmit={onSubmit}>
          <VStack spacing={10}>
            <FormControl>
              <FormLabel color="white">Name</FormLabel>
              <InputGroup>
                <Input
                  isRequired
                  backgroundColor="whiteAlpha.600"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <InputRightAddon>Title</InputRightAddon>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel color="white">Description</FormLabel>
              <InputGroup>
                <Textarea
                  isRequired
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  backgroundColor="whiteAlpha.600"
                  placeholder="Here is a sample description"
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel color="white">Image (Short url)</FormLabel>
              <InputGroup>
                <Input
                  isRequired
                  backgroundColor="whiteAlpha.600"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <InputRightAddon>url</InputRightAddon>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel color="white">Minimum Contribution</FormLabel>
              <InputGroup>
                <Input
                  isRequired
                  backgroundColor="whiteAlpha.600"
                  type="number"
                  value={minimumContribution}
                  onChange={(e) => setminimumContribution(e.target.value)}
                />
                <InputRightAddon>wei</InputRightAddon>
              </InputGroup>
            </FormControl>
            <Button
              isLoading={loading}
              loadingText="Submitting"
              type="submit"
              colorScheme="blue"
              size="lg"
            >
              Create Campaign
            </Button>
          </VStack>
        </form>
      </VStack>
    </Container>
  );
};

export default CampaignNew;
