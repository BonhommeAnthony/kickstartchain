import React, { useEffect, useState } from "react";
import { FaEthereum } from "react-icons/fa";
import Link from "next/link";
import { FiPlus, FiMenu } from "react-icons/fi";
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
  IconButton,
} from "@chakra-ui/react";

const Navbar = ({ handleClick }) => {
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

  const NavItem = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "All Campaigns",
      href: "allCampaigns",
    },
  ];

  return (
    <Flex
      zIndex="5"
      bgColor={navBackground == true ? "whiteAlpha.900" : ""}
      w="100%"
      pos="fixed"
      top="0"
      justify="center"
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
        <Flex display={["none", "none", "flex"]}>
          <HStack spacing={8}>
            {NavItem.map((item, i) => (
              <Link key={i} href={item.href}>
                <Button
                  cursor="pointer"
                  _hover={{ color: "gray.300", transform: "scale(1.1)" }}
                  as="a"
                  variant="ghost"
                  aria-label={item.name}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
            <Button
              onClick={handleClick}
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
          </HStack>
        </Flex>

        <Menu autoSelect={false}>
          <MenuButton display={["flex", "flex", "none", "none"]}>
            <IconButton
              colorScheme={navBackground == true ? "blackAlpha" : "whiteAlpha"}
              icon={<FiMenu />}
            />
          </MenuButton>
          <MenuList color="gray.600" w="100%" backgroundColor="whiteAlpha.900">
            {NavItem.map((item, i) => (
              <MenuItem key={i}>
                <Link href={item.href}>
                  <Button
                    cursor="pointer"
                    as="a"
                    variant="ghost"
                    aria-label={item.name}
                  >
                    {item.name}
                  </Button>
                </Link>
              </MenuItem>
            ))}
            <MenuItem>
              <Button
                onClick={handleClick}
                py={6}
                fontSize="md"
                borderRadius="lg"
                boxShadow="xl"
                variant="outline"
                colorScheme="blackAlpha"
                leftIcon={<FiPlus />}
                _hover={{ transform: "scale(1.02)" }}
              >
                Create Campaign
              </Button>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Navbar;
