import { useState } from "react";

import {
  Button,
  Box,
  Flex,
} from "@chakra-ui/react";
import { withRouter } from "react-router-dom";
import SignInComponent from "../../components/sign-in-up-components/SignIn.component";
import SignUpComponent from "../../components/sign-in-up-components/SignUp.component";

const SignInAndSignUp = ({ history }) => {
  const [switchView, setSwitchView] = useState(true);

  return (
    <Box w="100%" h="90vh" d="flex" justifyContent="center" alignItems="center" >
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Box w="70vh" border="1px solid" borderRadius="10px">
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
          <Box w="100%" p="50px" position="relative">
            {switchView ? <SignInComponent /> : <SignUpComponent />}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default withRouter(SignInAndSignUp);
