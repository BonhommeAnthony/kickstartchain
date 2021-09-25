import { Heading, Text, Button, Flex, Stack, VStack } from "@chakra-ui/react";

import { FiPlus, FiGithub } from "react-icons/fi";

const Header = () => {
  return (
    <Flex my={[5, 14]} direction="column">
      <VStack alignItems="flex-start" spacing={12}>
        <Heading w={["100%", "50%"]} color="white" fontSize="43px" as="h3">
          Create your crowdfunding on the Ethereum Blockchain easily.
        </Heading>
        <Text
          lineHeight="2rem"
          w={["100%", "50%"]}
          fontWeight="bold"
          fontSize="17px"
          color="white"
        >
          KickstartChain is a personnal open-source project on the Rinkeby
          testnet. This is not for real life project.
        </Text>

        <Stack w="full" direction={["column", "row"]} spacing={4}>
          <Button
            borderRadius="lg"
            boxShadow="xl"
            py={7}
            colorScheme="whiteAlpha"
            leftIcon={<FiPlus />}
          >
            Create Campaign
          </Button>

          <Button
            borderRadius="lg"
            boxShadow="xl"
            py={7}
            colorScheme="blue"
            leftIcon={<FiGithub />}
          >
            Github repo
          </Button>
        </Stack>
      </VStack>
    </Flex>
  );
};

export default Header;
