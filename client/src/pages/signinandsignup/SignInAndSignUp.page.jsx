import { useContext, useState } from "react";
import { signIn, signUp } from "./auth-helper";

import {
  Input,
  Button,
  Box,
  Flex,
  Text,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { UserContext } from "../../context/user/UserContext";
import { withRouter } from "react-router-dom";
import { loginAction } from "../../context/user/user.actions";

const SignInAndSignUp = ({ history }) => {
  const [switchView, setSwitchView] = useState(true);
  const { userDispatch } = useContext(UserContext);
  const toast = useToast();

  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const SignUpComponent = () => {
    const [cred, setCred] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
    const [loading, setLoading] = useState(false);

    const { firstName, lastName, email, password } = cred;

    const handleChange = (e) => {
      const name = e.target.name;
      setCred({ ...cred, [name]: e.target.value });
    };

    const handleSubmit = (e) => {
      setLoading(true);
      signUp(cred).then((response) => {
        const data = response.data;
        if (data.user) {
          setLoading(false);
          userDispatch(loginAction(data.user))
          toast({
            title: "Sign up",
            description: "You've signed up successfully",
            status: "success",
          });
          setShowLoadingScreen(true);
          setTimeout(() => {
            history.push("/");
          }, 3000);
        } else if (data.error) {
          setLoading(false);
          toast({
            title: "Error",
            description: data.error,
            status: "error",
          });
        }
      });
    };

    return (
      <Box h="300px" d={`${showLoadingScreen && "none"}`}>
        <form>
          <Text fontWeight="bold" fontSize="30px" as="h3">
            Sign Up
          </Text>
          <Input
            my="5px"
            onChange={handleChange}
            name="firstName"
            placeholder="First Name"
            value={firstName}
          />
          <Input
            my="5px"
            onChange={handleChange}
            name="lastName"
            placeholder="Last Name"
            value={lastName}
            isRequired={true}
          />
          <Input
            my="5px"
            onChange={handleChange}
            name="email"
            placeholder="Email"
            value={email}
          />
          <Input
            my="5px"
            onChange={handleChange}
            name="password"
            placeholder="Password"
            value={password}
            type="password"
          />
          <Button w="100%" bg="blue.400" onClick={handleSubmit}>
            {loading ? <Spinner /> : "SIGN UP"}
          </Button>
        </form>
      </Box>
    );
  };

  const SignInComponent = () => {
    const [cred, setCred] = useState({
      email: "",
      password: "",
    });
    const [loading, setLoading] = useState(false);

    const { email, password } = cred;
    const handleChange = (e) => {
      const name = e.target.name;
      setCred({ ...cred, [name]: e.target.value });
    };

    const handleSubmit = (e) => {
      setLoading(true);
      signIn(cred).then((response) => {
        const data = response.data;
        if (data.user) {
          userDispatch(loginAction(data.user))
          toast({
            title: "Sign In",
            description: "You've signed in successfully",
            status: "success",
          });
          setShowLoadingScreen(true);
          setTimeout(() => {
            history.push("/");
          }, 3000);
        } else if (data.error) {
          setLoading(false);
          toast({
            title: "Error",
            description: data.error,
            status: "error",
          });
        }
      });
    };

    return (
      <Box h="300px" d={`${showLoadingScreen && "none"}`}>
        <form>
          <Text fontWeight="bold" fontSize="30px" as="h3">
            Sign In
          </Text>
          <Input
            my="5px"
            onChange={handleChange}
            placeholder="Email"
            name="email"
            value={email}
          />
          <Input
            my="5px"
            onChange={handleChange}
            placeholder="Password"
            name="password"
            value={password}
            type="password"
          />
          <Button w="100%" bg="green.400" onClick={handleSubmit}>
            {loading ? <Spinner /> : "SIGN IN"}
          </Button>
        </form>
      </Box>
    );
  };

  return (
    <Box w="100%" h="90vh" d="flex" justifyContent="center" alignItems="center" >
      {showLoadingScreen && 
      <Spinner position="absolute" zIndex="999" size="xl" mx="auto" color="#fff" />
      }
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
