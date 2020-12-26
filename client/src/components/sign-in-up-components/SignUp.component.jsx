import { Button, Input, Text, Box, useToast, Spinner } from "@chakra-ui/react";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { loginAction } from "../../context/user/user.actions";
import { UserContext } from "../../context/user/UserContext";
import { signUp } from "../../pages/signinandsignup/auth-helper";

const SignUpComponent = () => {
    const {userDispatch} = useContext(UserContext)
    const history = useHistory()
    const toast = useToast()
    const [cred, setCred] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
    const [loadingScreen, setLoadingScreen] = useState(false)

    const { firstName, lastName, email, password } = cred;

    const handleChange = (e) => {
      const name = e.target.name;
      setCred({ ...cred, [name]: e.target.value });
    };

    const handleSubmit = (e) => {
      signUp(cred).then((response) => {
        const data = response.data;
        if (data.user) {
          setLoadingScreen(true)
          userDispatch(loginAction(data.user))
          toast({
            title: "Sign up",
            description: "You've signed up successfully",
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
            SIGN UP
          </Button>
        </form>
      </Box>
    ) : <Spinner size="xl"/>
  };

export default SignUpComponent