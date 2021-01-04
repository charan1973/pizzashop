import { ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useBreakpointValue,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { logoutAction } from "../../context/user/user.actions";
import { UserContext } from "../../context/user/UserContext";
import { signOut } from "../../pages/signinandsignup/auth-helper";
import CartIcon from "../../assets/shopping-cart.svg"
import { ItemContext } from "../../context/item/ItemContext";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode("dark");
  const toast = useToast();
  const displayFull = useBreakpointValue({ base: "none", md: "" });
  const displaySmall = useBreakpointValue({ base: "", md: "none" });

  const { user, userDispatch } = useContext(UserContext);
  const {item} = useContext(ItemContext)
  const handleLogout = () => {
    userDispatch(logoutAction());
    signOut();
    toast({
      title: "Sign Out",
      description: "Signed out complete",
      status: "success",
      duration: "2000",
    });
  };

  // Show cart items length
  const cartLength = item.cart.length > 0 && item.cart.length

  return (
    <nav>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py="20px"
      >
        <Heading as="h3" size="md" fontWeight="bold">
          <Box d="flex" alignItems="center">
            <Box d="flex" alignItems="center" as={Link} to="/">
              <Image src={Logo} h="50px" />
              Pizzetta
            </Box>
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
          w={["50%", "40%", "25%"]}
          alignItems="center"
          justifyContent="space-around"
          fontWeight="bold"
        >
          <Button as={Link} to="/cart" style={{ display: displayFull, margin: "0 15px" }} bg="#fff">
            <Image src={CartIcon} h="25px" />
            <p style={{color: "#000"}}>{cartLength && "(" + cartLength +")"}</p>
          </Button>
          <Menu>
            <MenuButton as={Button} fontSize="15px" rightIcon={<ChevronDownIcon />}>
              Options<Text as="span" style={{ display: displaySmall }}>{cartLength && "(" + cartLength +")"}</Text>
            </MenuButton>
            <MenuList p="7px">
              <MenuItem as={Link} to="/cart" style={{ display: displaySmall }}>
                CART{cartLength && "(" + cartLength +")"}
              </MenuItem>
              {user && (
                <>
                  <MenuItem as={Link} to="/user/profile">
                    PROFILE
                  </MenuItem>
                  <MenuItem
                    style={{ cursor: "pointer" }}
                    onClick={handleLogout}
                  >
                    SIGNOUT
                  </MenuItem>
                </>
              )}
              {!user && (
                <MenuItem as={Link} to="/signin">
                  SIGNIN
                </MenuItem>
              )}
            </MenuList>
          </Menu>
          {user.role === 1 && (
            <Button as={Link} to="/admin" bg="red.400">
              ADMIN
            </Button>
          )}
        </Box>
      </Box>
    </nav>
  );
};

export default Navbar;
