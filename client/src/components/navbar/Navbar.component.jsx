import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, useColorMode } from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/user/UserContext";
import { LOGOUT_USER } from "../../context/user/userTypes";
import { signOut } from "../../pages/signinandsignup/auth-helper";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, userDispatch } = useContext(UserContext);

  const handleLogout = () => {
    userDispatch({ type: LOGOUT_USER });
    signOut();
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
          <Link to="/cart">CART</Link>
          {!user && <Link to="/signin">SIGNIN</Link>}
          {user && <div style={{cursor: "pointer"}} onClick={handleLogout}>SIGNOUT</div>}
        </Box>
      </Box>
    </nav>
  );
};

export default Navbar;
