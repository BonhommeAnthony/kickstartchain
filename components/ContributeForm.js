import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightAddon } from "@chakra-ui/input";
import { Badge, Flex, Stack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";

const ContributeForm = ({ campaignAddress }) => {
  const [contribution, setContribution] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const toast = useToast();

  const onSubmit = async (e) => {
    e.preventDefault();
    const campaign = Campaign(campaignAddress);
    setLoading(true);

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(contribution, "ether"),
      });
      router.reload();
      toast({
        title: "Congratulation!",
        description: " You contribute to this campaign !",
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
    <Flex
      color="white"
      bg="whiteAlpha.400"
      backdropBlur="blur(64px)"
      borderStyle="inset"
      direction="column"
      fontSize="13px"
      borderRadius="md"
      boxShadow="xl"
      p={4}
    >
      <form onSubmit={onSubmit}>
        <Stack spacing={5}>
          <FormControl>
            <FormLabel mb={6} fontSize="13px" color="white">
              <Badge borderRadius="full" color="white" colorScheme="blue">
                Amount to Contribute
              </Badge>
            </FormLabel>
            <InputGroup>
              <Input
                backgroundColor="whiteAlpha.600"
                type="number"
                value={contribution}
                onChange={(e) => setContribution(e.target.value)}
              />
              <InputRightAddon fontWeight="bold" fontSize="13px" color="black">
                Ether
              </InputRightAddon>
            </InputGroup>
          </FormControl>
          <Button
            isDisabled={contribution <= 0 ? true : false}
            isLoading={loading}
            loadingText="Submitting"
            type="submit"
            colorScheme="blue"
            fontSize="13px"
          >
            Contribute
          </Button>
        </Stack>
      </form>
    </Flex>
  );
};

export default ContributeForm;
