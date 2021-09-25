import {
  Flex,
  Heading,
  Icon,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Container,
  IconButton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaEthereum } from "react-icons/fa";
import Link from "next/link";
import { FiPlus, FiMenu, FiX } from "react-icons/fi";

const Layout = ({ children }) => {
  const [navBackground, setNavBackground] = useState(false);

  const navRef = React.useRef();
  navRef.current = navBackground;

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 0;
      show ? setNavBackground(true) : setNavBackground(false);
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Flex
      bgGradient="background-color: #FF3CAC;
      background-image: linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%);
    "
      justify="center"
      flexDir="column"
      m="auto"
    >
      <Flex
        bgColor={navBackground == true ? "whiteAlpha.900" : ""}
        w="100%"
        pos="fixed"
        top="0"
        justify="center"
        // maxW="container.xl"
        justifyContent="space-between"
        color="white"
        align="center"
        height={16}
        px={6}
      >
        <Flex
          m="auto"
          justifyContent="space-between"
          w="container.xl"
          align="center"
        >
          <Link href="/">
            <Flex
              color={navBackground == true ? "black" : "white"}
              cursor="pointer"
            >
              <Icon as={FaEthereum} w={6} h={6} />
              <Heading size="md" as="h2">
                KickstartChain
              </Heading>
            </Flex>
          </Link>
          <Flex
            display={["none", "none", "flex"]}
            fontWeight="bold"
            fontSize="md"
            color={navBackground == true ? "black" : "white"}
          >
            <HStack spacing={8}>
              <Link href="/">
                <Button
                  cursor="pointer"
                  _hover={{ color: "gray.300", transform: "scale(1.1)" }}
                  as="a"
                  variant="ghost"
                  aria-label="Home"
                >
                  Home
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  cursor="pointer"
                  _hover={{ color: "gray.300", transform: "scale(1.1)" }}
                  as="a"
                  variant="ghost"
                  aria-label="About"
                >
                  About
                </Button>
              </Link>
              <Link href="/allcampaigns">
                <Button
                  cursor="pointer"
                  _hover={{ color: "gray.300", transform: "scale(1.1)" }}
                  as="a"
                  variant="ghost"
                  aria-label="All Campaigns"
                >
                  All Campaigns
                </Button>
              </Link>
            </HStack>
          </Flex>
          <Flex display={["none", "none", "flex"]}>
            <Button
              py={6}
              fontSize="md"
              borderRadius="lg"
              boxShadow="xl"
              colorScheme={navBackground == true ? "blackAlpha" : "whiteAlpha"}
              leftIcon={<FiPlus />}
              _hover={{ transform: "scale(1.02)" }}
            >
              Create Campaign
            </Button>
          </Flex>
          <Menu autoSelect={false}>
            <MenuButton display={["flex", "flex", "none", "none"]}>
              <IconButton
                colorScheme={
                  navBackground == true ? "blackAlpha" : "whiteAlpha"
                }
                icon={<FiMenu />}
              />
            </MenuButton>
            <MenuList
              color="gray.600"
              w="100%"
              backgroundColor="whiteAlpha.900"
            >
              <MenuItem>
                <Link href="/">
                  <Button
                    cursor="pointer"
                    _hover={{ color: "black", transform: "scale(1.1)" }}
                    as="a"
                    variant="ghost"
                    aria-label="Home"
                  >
                    Home
                  </Button>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link href="/about">
                  <Button
                    cursor="pointer"
                    _hover={{ color: "black", transform: "scale(1.1)" }}
                    as="a"
                    variant="ghost"
                    aria-label="About"
                  >
                    About
                  </Button>
                </Link>
              </MenuItem>
              <MenuItem>
                {" "}
                <Link href="/allcampaigns">
                  <Button
                    cursor="pointer"
                    _hover={{ color: "black", transform: "scale(1.1)" }}
                    as="a"
                    variant="ghost"
                    aria-label="All Campaigns"
                  >
                    All Campaigns
                  </Button>
                </Link>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      {children}
      <Flex px={6} justifyContent="space-between">
        <Flex>Copyright</Flex>
        <Flex>Menu</Flex>
        <Flex>Logo</Flex>
      </Flex>
    </Flex>
  );
};

export default Layout;
