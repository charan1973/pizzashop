import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, useColorMode, useToast } from "@chakra-ui/react";
import { useContext } from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import { logoutAction } from "../../context/user/user.actions";
import { UserContext } from "../../context/user/UserContext";
import { signOut } from "../../pages/signinandsignup/auth-helper";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode("dark");
  const { user, userDispatch } = useContext(UserContext);
  const toast = useToast()
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
          <Link to="/">Pizzetta</Link>
          <Button
            mx="10px"
            _focus={{ outline: "none" }}
            onClick={toggleColorMode}
          >
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Heading>
        <Box
          display="flex"
          w="20%"
          alignItems="center"
          justifyContent="space-around"
          fontWeight="bold"
        >
          {user.role === 1 && <Link to="/admin">ADMIN</Link>}
          <Link to="/cart"><FontAwesome name="shopping-cart" size="2x" /> </Link>
          {!user && <Link to="/signin">SIGNIN</Link>}
          {user && <div style={{cursor: "pointer"}} onClick={handleLogout}>SIGNOUT</div>}
        </Box>
      </Box>
    </nav>
  );
};

export default Navbar;
