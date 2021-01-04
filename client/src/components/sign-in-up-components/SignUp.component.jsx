import {
  Button,
  Input,
  Text,
  Box,
  useToast,
  Spinner,
  Checkbox,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { loginAction } from "../../context/user/user.actions";
import { UserContext } from "../../context/user/UserContext";
import { signUp } from "../../pages/signinandsignup/auth-helper";

const SignUpComponent = () => {
  const { userDispatch } = useContext(UserContext);
  const toast = useToast();
  const [cred, setCred] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { firstName, lastName, email, password } = cred;

  const handleChange = (e) => {
    const name = e.target.name;
    setCred({ ...cred, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (!(firstName && lastName && email && password))
      return toast({
        title: "Error",
        description: "All fields are required",
        status: "error",
      });
    setLoadingScreen(true);

    signUp(cred).then((response) => {
      const data = response.data;
      if (data.user) {
        userDispatch(loginAction(data.user));
        toast({
          title: "Sign up",
          description: "You've signed up successfully",
          status: "success",
        });
      } else if (data.error) {
        setLoadingScreen(false);
        toast({
          title: "Error",
          description: data.error,
          status: "error",
        });
      }
    });
  };

  return !loadingScreen ? (
    <Box h="300px">
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
          type={!showPassword ? "password" : "text"}
        />
        <Checkbox
          onChange={() => setShowPassword(!showPassword)}
          checked={showPassword}
          my="10px"
        >
          Show Password
        </Checkbox>
        <Button w="100%" bg="blue.400" onClick={handleSubmit}>
          SIGN UP
        </Button>
      </form>
    </Box>
  ) : (
    <Spinner size="xl" />
  );
};

export default SignUpComponent;
