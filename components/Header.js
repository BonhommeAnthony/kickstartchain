import { Heading, Text, Button, Flex, Stack, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiPlus, FiGithub } from "react-icons/fi";

const Header = () => {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push("/campaigns/new");
  };
  return (
    <>
      <VStack alignItems="flex-start" spacing={[12, 14]}>
        <Heading
          w={["100%", "50%"]}
          color="white"
          fontSize={["43px", "60px"]}
          as="h3"
        >
          Create your crowdfunding on the Ethereum Blockchain easily.
        </Heading>
        <Text
          lineHeight="2rem"
          w={["100%", "40%"]}
          fontWeight="bold"
          fontSize="17px"
          color="white"
        >
          KickstartChain is a personal open-source project on the Rinkeby
          testnet. This is not for real-life projects.
        </Text>

        <Stack w="full" direction={["column", "row"]} spacing={4}>
          <Button
            onClick={handleClick}
            borderRadius="lg"
            boxShadow="xl"
            py={7}
            colorScheme="whiteAlpha"
            leftIcon={<FiPlus />}
          >
            Create Campaign
          </Button>

          <Button
            onClick={() =>
              router.push("https://github.com/BonhommeAnthony/kickstartchain")
            }
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
    </>
  );
};

export default Header;
