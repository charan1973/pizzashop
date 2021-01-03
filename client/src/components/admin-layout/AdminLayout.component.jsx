import { Box, Flex, Grid, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import Head from "../head/Head.component";

const SideBar = () => {
  const history = useHistory();

  const currentTab = (history, path) => {
    if (history.location.pathname === path) {
      return {
        backgroundColor: "#2e8b7b",
        borderRadius: "10px",
        padding: "20px 10px",
        margin: "30px 0",
        fontWeight: "bold",
      };
    } else {
      return {
        padding: "20px 10px",
        margin: "30px 0",
        fontWeight: "bold",
      };
    }
  };

  return (
    <Flex flexDirection="column">
      <Link
        as={RouterLink}
        _hover={{ textDecoration: "none" }}
        style={currentTab(history, "/admin")}
        _focus={{ outline: "none" }}
        to="/admin"
      >
        Home
      </Link>
      <Link
        as={RouterLink}
        _hover={{ textDecoration: "none" }}
        style={currentTab(history, "/admin/category")}
        _focus={{ outline: "none" }}
        to="/admin/category"
      >
        Category
      </Link>
      <Link
        as={RouterLink}
        _hover={{ textDecoration: "none" }}
        style={currentTab(history, "/admin/addon")}
        _focus={{ outline: "none" }}
        to="/admin/addon"
      >
        Add On
      </Link>
      <Link
        as={RouterLink}
        _hover={{ textDecoration: "none" }}
        style={currentTab(history, "/admin/item")}
        _focus={{ outline: "none" }}
        to="/admin/item"
      >
        Item
      </Link>
      <Link
        as={RouterLink}
        _hover={{ textDecoration: "none" }}
        style={currentTab(history, "/admin/order")}
        _focus={{ outline: "none" }}
        to="/admin/order"
      >
        Order
      </Link>
    </Flex>
  );
};

const AdminLayout = ({ children, sectionTitle }) => {
  return (
    <Box>
    <Head title={`Admin ${sectionTitle.replace("Admin", "")}`} />
      <Text
        as="h1"
        textAlign="center"
        p="50px"
        fontWeight="bolder"
        fontSize="30px"
      >
        ADMIN PANEL
      </Text>
      <Grid templateColumns="0.25fr 1fr" gridGap="20px">
        <SideBar />
        <Box>
          <Text
            as="h3"
            color="white"
            fontSize="25px"
            backgroundColor="rgb(46, 139, 123)"
            my="10px"
            borderRadius="10px"
            fontWeight="bold"
            textAlign="center"
          >
            {sectionTitle}
          </Text>
          {children}
        </Box>
      </Grid>
    </Box>
  );
};

export default AdminLayout;
