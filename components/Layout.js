import { Flex, Heading, Icon, HStack, Button, Box } from "@chakra-ui/react";
import React from "react";
import { FaEthereum } from "react-icons/fa";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";

const Layout = ({ children }) => {
  return (
    <Box
      bgGradient="background-color: #FF3CAC;
      background-image: linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%);
        
    "
    >
      <Flex
        color="white"
        align="center"
        height={16}
        px={6}
        justifyContent="space-between"
      >
        <Link href="/">
          <Flex color="white" cursor="pointer">
            <Icon as={FaEthereum} w={6} h={6} />
            <Heading size="md" as="h2">
              KickstartChain
            </Heading>
          </Flex>
        </Link>
        <Flex fontWeight="bold" fontSize="md">
          <HStack spacing={8}>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/allcampaigns">All Campaigns</Link>
          </HStack>
        </Flex>
        <Flex>
          <Button
            py={6}
            fontSize="md"
            borderRadius="lg"
            boxShadow="xl"
            colorScheme="whiteAlpha"
            leftIcon={<FiPlus />}
          >
            Create Campaign
          </Button>
        </Flex>
      </Flex>
      {children}
      <Flex
        px={6}
        justifyContent="space-between"
        position="fixed"
        left="0"
        bottom="0"
        width="100%"
      >
        <Flex>Copyright</Flex>
        <Flex>Menu</Flex>
        <Flex>Logo</Flex>
      </Flex>
    </Box>
  );
};

export default Layout;
