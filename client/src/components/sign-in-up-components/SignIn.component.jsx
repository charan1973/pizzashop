import {
  Button,
  Input,
  Text,
  Box,
  useToast,
  Spinner,
  Checkbox,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { loginAction } from "../../context/user/user.actions";
import { UserContext } from "../../context/user/UserContext";
import { signIn } from "../../pages/signinandsignup/auth-helper";

const SignInComponent = () => {
  const { userDispatch } = useContext(UserContext);
  const toast = useToast();
  const [cred, setCred] = useState({
    email: "",
    password: "",
  });
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = cred;
  const handleChange = (e) => {
    const name = e.target.name;
    setCred({ ...cred, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    if (!(email && password))
      toast({
        title: "Error",
        description: "All fields required",
        status: "error",
      });
    setLoadingScreen(true);
    signIn(cred).then((response) => {
      const data = response.data;
      if (data.user) {
        userDispatch(loginAction(data.user));
        toast({
          title: "Sign In",
          description: "You've signed in successfully",
          status: "success",
        });
      } else if (data.error) {
        toast({
          title: "Error",
          description: data.error,
          status: "error",
        });
        setLoadingScreen(false);
      }
    });
  };

  return !loadingScreen ? (
    <Box h="300px">
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
          type={!showPassword ? "password" : "text"}
        />
        <Checkbox
          onChange={() => setShowPassword(!showPassword)}
          checked={showPassword}
          my="10px"
        >
          Show Password
        </Checkbox>
        <Button w="100%" bg="green.400" onClick={handleSubmit}>
          SIGN IN
        </Button>
      </form>
    </Box>
  ) : (
    <Spinner size="xl" />
  );
};

export default SignInComponent;
