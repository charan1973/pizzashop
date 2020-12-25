import {
  Box,
  Button,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import CartItem from "../../components/cart-item/cart-item.component";
import { ItemContext } from "../../context/item/ItemContext";

const CartPage = () => {
  const {
    item: { cart },
  } = useContext(ItemContext);

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

  return cart.length > 0 ? (
    <Box mb="60px">
    <Box id="cart-list">
      {
        cart.map((item) => <CartItem item={item} />)
      }
    </Box>
      <Box
        position="fixed"
        left="0"
        right="0"
        bottom="0"
        w="100%"
        h="50px"
        p="20px"
        // bg="gray.700"
        d="flex"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Box d="flex" alignItems="center" justifyContent="flex-end">
          <Text as="h5" fontSize="25px" mr="10px">
            Total: ₹{calculateTotal()}
          </Text>
          <Button bg="green.400">PLACE ORDER</Button>
        </Box>
      </Box>
    </Box>
  ) : (
    <Box d="flex" justifyContent="center" alignItems="center">
      <Button as={Link} to="/">ADD TO ITEMS CART</Button>
    </Box>
  );
};

export default CartPage;
