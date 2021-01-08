import { Box, Button, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ErrorIcon from "../../assets/404.svg";

const ErrorPage = () => {
  return (
    <Box
      d="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      h="80vh"
    >
      <Box w="40%">
        <Image src={ErrorIcon} w="100%" mb="20px" />
        <Text as="h2" textAlign="center" fontSize="20px">
          404 Error! Page not found.
        </Text>
        <Button as={Link} to="/" w="100%">
          Go Home
        </Button>
      </Box>
    </Box>
  );
};

export default ErrorPage;
