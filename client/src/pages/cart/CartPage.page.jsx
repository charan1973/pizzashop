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
import { Checkmark } from "react-checkmark";

import { ItemContext } from "../../context/item/ItemContext";
import { UserContext } from "../../context/user/UserContext";

import CartItem from "../../components/cart-item/cart-item.component";
import AddressPreview from "../../components/address-preview/AddressPreview.component";
import { getUserData } from "../user-profile/user.helper";
import StripeCheckout from "react-stripe-checkout";
import { placeOrder, calculateTotal } from "./cart.helper";
import { clearCartAction } from "../../context/item/item.actions";
import Head from "../../components/head/Head.component";

const CartPage = () => {
  const toast = useToast();
  const { user } = useContext(UserContext);
  const {
    item: { cart },
    itemDispatch,
  } = useContext(ItemContext);

  const [addressLoad, setAddressLoad] = useState({
    address: [],
    loaded: false,
  });

  const [order, setOrder] = useStateWithCallbackLazy({
    addressId: "",
    orderContent: [...cart],
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    getUserData().then(({ data }) => {
      if (data.user) {
        setAddressLoad({ address: [...data.user.address], loaded: true });
      }
    });
  }, []);

  const handlePlaceOrder = (token) => {
    if (token.id) {
      placeOrder(order, token).then(({ data }) => {
        if (data.message) {
          toast({
            title: "Order Placed",
            description: data.message,
            status: "success",
          });
          itemDispatch(clearCartAction());
          setOrderPlaced(true);
        } else if (data.error) {
          toast({
            title: "Error",
            description: data.error,
            status: "error",
          });
        }
      });
    }
  };

  return cart.length > 0 ? (
    <Grid
      templateColumns={{ lg: "75% 25%" }}
      gap={5}
      mb="60px"
      justifyContent={{ base: "center" }}
    >
      <Head title="Cart" />
      <Box>
        <Flex>
          <Button as={Link} to="/" mb="10px">
            <ChevronLeftIcon />
            GO BACK HOME
          </Button>
        </Flex>
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
        w="100%"
        overflow="hidden"
        id="address"
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
          {addressLoad.loaded && user && addressLoad.address.length > 0 ? (
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
              {!user && <p>Sign In to select an address</p>}
              {!addressLoad.address.length  && user && <p>Please add an address</p>}
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
        bg={{base: "gray.700", md: "none", lg: "none"}}
      >
        <Box d="flex" alignItems="center" justifyContent="flex-end">
          <Text as="h5" fontSize="25px" mr="10px">
            Total: ₹{calculateTotal(cart)}
          </Text>
          {order.addressId ? (
            <StripeCheckout
              stripeKey={process.env.REACT_APP_STRIPE_KEY}
              token={handlePlaceOrder}
              name="Order Pizza"
              email={user.email}
              currency="INR"
              amount={calculateTotal(cart) * 100}
            >
              <Button bg="green.400" onClick={handlePlaceOrder}>
                PLACE ORDER
              </Button>
            </StripeCheckout>
          ) : (
            <Button
            as="a"
              onClick={() =>
                toast({
                  title: "Select Address",
                  duration: 1000,
                })
              }
              href="#address"
            >
              Place Order
            </Button>
          )}
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
      {orderPlaced && (
        <Box borderRadius="lg" border="1px" p="15px" m="20px">
          <Checkmark size={96} />
          <Text as="h2" fontSize="36px">
            Order placed
          </Text>
        </Box>
      )}
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
