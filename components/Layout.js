import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Head from "next/head";

import { useRouter } from "next/router";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push("/campaigns/new");
  };

  return (
    <Flex
      minHeight="100vh"
      bgGradient="background-color: #FF3CAC;
      background-image: linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%);
    "
      justify="center"
      flexDir="column"
      m="auto"
    >
      <Head>
        <title>KickstartChain</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar handleClick={handleClick} />
      <Flex my={[20, "150px"]} direction="column">
        {children}
      </Flex>
      <Flex px={6} justifyContent="space-between">
        <Flex>Copyright</Flex>
        <Flex>Menu</Flex>
        <Flex>Logo</Flex>
      </Flex>
    </Flex>
  );
};

export default Layout;
