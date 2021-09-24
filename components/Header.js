import { Heading, Text, Button, Flex, HStack, VStack } from "@chakra-ui/react";

import { FiPlus, FiGithub } from "react-icons/fi";

const Header = () => {
  return (
    <Flex my={14} direction="column">
      <VStack spacing={12} alignItems="flex-start">
        <Heading w="50%" color="white" size="3xl" as="h3">
          Create your crowdfunding on the Ethereum Blockchain easily.
        </Heading>
        <Text w="50%" fontWeight="bold" fontSize="xl" color="white">
          KickstartChain is a personnal open-source project on the Rinkeby
          testnet. This is not for real life project yet.
        </Text>
        <Flex align="center">
          <HStack spacing={4}>
            <Button
              size="md"
              borderRadius="lg"
              boxShadow="xl"
              py={7}
              colorScheme="whiteAlpha"
              leftIcon={<FiPlus />}
            >
              Create Campaign
            </Button>
            <Button
              size="md"
              borderRadius="lg"
              boxShadow="xl"
              py={7}
              colorScheme="whiteAlpha"
              leftIcon={<FiGithub />}
            >
              Github repo
            </Button>
          </HStack>
        </Flex>
      </VStack>
    </Flex>
  );
};

export default Header;
