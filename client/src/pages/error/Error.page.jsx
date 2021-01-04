import { Box, Button, Image, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import ErrorIcon from "../../assets/404.svg"


const ErrorPage = () => {
    return (
        <Box d="flex" flexDirection="column" justifyContent="center" h="70vh">
            <Image src={ErrorIcon} w="100%" />
            <Text as="h2" textAlign="center" fontSize="20px">404 Error! Page not found.</Text>
            <Button as={Link} to="/">Go Home</Button>
        </Box>
    )
}

export default ErrorPage