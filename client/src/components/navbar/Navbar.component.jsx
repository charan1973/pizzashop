import { ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, Image, Menu, MenuButton, MenuItem, MenuList, useBreakpointValue, useColorMode, useToast } from "@chakra-ui/react";
import { useContext } from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png"
import { logoutAction } from "../../context/user/user.actions";
import { UserContext } from "../../context/user/UserContext";
import { signOut } from "../../pages/signinandsignup/auth-helper";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode("dark");
  const toast = useToast()
  const displayFull = useBreakpointValue({base: "none", md: ""})
  const displaySmall = useBreakpointValue({base: "", md: "none"})

  const { user, userDispatch } = useContext(UserContext);
  const handleLogout = () => {
    userDispatch(logoutAction());
    signOut();
    toast({
      title: "Sign Out",
      description: "Signed out complete",
      status: "success",
      duration: "2000"
    })
  };

  return (
    <nav>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py="20px"
      >
        <Heading as="h3" size="md" fontWeight="bold">
        <Box d="flex" justifyContent="center" alignItems="center">
        <Image src={Logo} h="50px" />
          <Link to="/">Pizzetta</Link>
          <Button
            mx="10px"
            _focus={{ outline: "none" }}
            onClick={toggleColorMode}
          >
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Box>
        </Heading>
        <Box
          display="flex"
          w="20%"
          alignItems="center"
          justifyContent="space-around"
          fontWeight="bold"
        >
          <Link to="/cart" style={{display: displayFull}}><FontAwesome name="shopping-cart" size="2x" /> </Link>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>Options</MenuButton>
            <MenuList p="7px">
              <MenuItem as={Link} to="/cart" style={{display: displaySmall}}>CART</MenuItem>
              {user && <MenuItem style={{cursor: "pointer"}} onClick={handleLogout}>SIGNOUT</MenuItem>}
              {!user && <MenuItem as={Link} to="/signin">SIGNIN</MenuItem>}
            </MenuList>
          </Menu>
          {user.role === 1 && <Button as={Link} to="/admin" bg="red.400">ADMIN</Button>}
        </Box>
      </Box>
    </nav>
  );
};

export default Navbar;
