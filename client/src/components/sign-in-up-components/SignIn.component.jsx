import { Button, Input, Text, Box, useToast, Spinner } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { loginAction } from "../../context/user/user.actions";
import { UserContext } from "../../context/user/UserContext";
import { signIn } from "../../pages/signinandsignup/auth-helper";

const SignInComponent = () => {
    const { userDispatch } = useContext(UserContext);
    const history = useHistory();
    const toast = useToast()
  const [cred, setCred] = useState({
    email: "",
    password: "",
  });
  const [loadingScreen, setLoadingScreen] = useState(false)

  const { email, password } = cred;
  const handleChange = (e) => {
    const name = e.target.name;
    setCred({ ...cred, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    signIn(cred).then((response) => {
      const data = response.data;
      if (data.user) {
          setLoadingScreen(true)
        userDispatch(loginAction(data.user));
        toast({
          title: "Sign In",
          description: "You've signed in successfully",
          status: "success",
        });
        setTimeout(() => {
          history.push("/");
        }, 3000);
      } else if (data.error) {
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
          SIGN IN
        </Button>
      </form>
    </Box>
  ) : <Spinner size="xl" />
};

export default SignInComponent;
