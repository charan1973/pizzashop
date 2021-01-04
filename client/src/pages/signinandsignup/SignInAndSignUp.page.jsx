import { useContext, useState } from "react";

import { Button, Box, Flex } from "@chakra-ui/react";
import { Redirect, withRouter } from "react-router-dom";
import SignInComponent from "../../components/sign-in-up-components/SignIn.component";
import SignUpComponent from "../../components/sign-in-up-components/SignUp.component";
import Head from "../../components/head/Head.component";
import { UserContext } from "../../context/user/UserContext";

const SignInAndSignUp = ({ history }) => {
  const {user} = useContext(UserContext)
  const [switchView, setSwitchView] = useState(true);

  return !user ? (
    <Box h="90vh" d="flex" justifyContent="center" alignItems="center">
      <Head title="Sign In" />
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Box w={["95vw", "85vw", "40vw"]} border="1px solid" borderRadius="10px">
          <Flex>
            <Button
              _focus={{ outline: "none" }}
              w="50%"
              bg={`${switchView ? "blue.400" : "gray.500"}`}
              onClick={() => setSwitchView(true)}
              borderRadius="0px"
              borderTopLeftRadius="9.5px"
            >
              SIGNIN
            </Button>
            <Button
              _focus={{ outline: "none" }}
              w="50%"
              bg={`${!switchView ? "blue.400" : "gray.500"}`}
              onClick={() => setSwitchView(false)}
              borderRadius="0px"
              borderTopRightRadius="9.5px"
            >
              SIGNUP
            </Button>
          </Flex>
          <Box w="100%" px="20px" py="50px" position="relative">
            {switchView ? <SignInComponent /> : <SignUpComponent />}
          </Box>
        </Box>
      </Flex>
    </Box>
  ) : <Redirect to="/" />
};

export default withRouter(SignInAndSignUp);
