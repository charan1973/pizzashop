import { useContext, useEffect, useState } from "react";
import { CheckCircleIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useStateWithCallbackLazy } from "use-state-with-callback";

import { ItemContext } from "../../context/item/ItemContext";
import { UserContext } from "../../context/user/UserContext";

import CartItem from "../../components/cart-item/cart-item.component";
import AddressPreview from "../../components/address-preview/AddressPreview.component";
import { getUserData } from "../user-profile/user.helper";
import { placeOrder } from "./cart.helper";

const CartPage = () => {
  const toast = useToast();
  const { user } = useContext(UserContext);
  const {
    item: { cart },
  } = useContext(ItemContext);

  const [addressLoad, setAddressLoad] = useState({
    address: [],
    loaded: false,
  });

  const [order, setOrder] = useStateWithCallbackLazy({
    addressId: "",
    orderContent: [],
  });

  useEffect(() => {
    getUserData().then(({ data }) => {
      if (data.user) {
        setAddressLoad({ address: [...data.user.address], loaded: true });
      }
    });
  }, []);

  const calculateTotal = () => {
    return cart.reduce(
      (a, item) =>
        a +
        (item.itemPrice +
          item.addOn.reduce((b, addOn) => b + addOn.addOnPrice, 0)) *
          item.quantity,
      0
    );
  };

  const handlePlaceOrder = () => {
    // Show error message if address is not selected
    if (!order.addressId)
      return toast({
        title: "Error",
        description: "Please select address",
        status: "error",
      });
    // send order
    setOrder(
      {
        ...order,
        orderContent: [...cart],
      },
      (currentOrderState) => {
        placeOrder(currentOrderState).then(({ data }) => {
          console.log(data.message);
          if (data.message) {
            toast({
              title: "Order Places",
              description: data.message,
              status: "success",
            });
          }
        });
      }
    );
  };

  return cart.length > 0 ? (
    <Grid templateColumns="75% 25%" gap={5} mb="60px">
      <Box>
        <Button as={Link} to="/" mb="10px">
          <ChevronLeftIcon />
          GO BACK HOME
        </Button>
        <Box id="cart-list">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </Box>
      </Box>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        mb="4px"
        boxShadow="md"
        h="320px"
        w="310px"
        overflow="hidden"
      >
        <Button
          as={Link}
          to="/user/profile"
          w="100%"
          bg="red.700"
          borderBottomRadius="none"
        >
          ADD NEW ADDRESS
        </Button>
        <Text textAlign="center" fontWeight="bold" fontSize="30px">
          or
        </Text>
        <Divider />
        <Box>
          <Text p="10px" fontWeight="bold">
            Choose address:
          </Text>
          <Divider />
        </Box>
        <Box overflow="scroll" h="64%">
          {addressLoad.loaded && user ? (
            addressLoad.address.map(({ address, _id }) => (
              <Box
                key={_id}
                cursor="pointer"
                _hover={{ bg: "gray.400" }}
                bg={order.addressId === _id && "gray.700"}
                onClick={() => setOrder({ ...order, addressId: _id })}
                m="10px"
              >
                <Flex justifyContent="space-between" alignItems="center">
                  <AddressPreview address={address} />
                  {order.addressId === _id && (
                    <CheckCircleIcon mr="30px" fontSize="28px" />
                  )}
                </Flex>
                <Divider />
              </Box>
            ))
          ) : (
            <Box d="flex" h="100%" justifyContent="center" alignItems="center">
              <p>Sign In to select an address</p>
            </Box>
          )}
        </Box>
      </Box>
      <Box
        position="fixed"
        left="0"
        right="0"
        bottom="0"
        w="100%"
        h="50px"
        p="20px"
        d="flex"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Box d="flex" alignItems="center" justifyContent="flex-end">
          <Text as="h5" fontSize="25px" mr="10px">
            Total: ₹{calculateTotal()}
          </Text>
          <Button bg="green.400" onClick={handlePlaceOrder}>
            PLACE ORDER
          </Button>
        </Box>
      </Box>
    </Grid>
  ) : (
    <Box
      d="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      h="500px"
    >
      <Box>
        <Text as="h2" fontSize="20px" textAlign="center">
          CART IS EMPTY
        </Text>
        <Button as={Link} to="/">
          ADD TO ITEMS CART
        </Button>
      </Box>
    </Box>
  );
};

export default CartPage;
