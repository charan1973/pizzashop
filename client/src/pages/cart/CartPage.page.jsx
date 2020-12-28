import { useContext } from "react";
import {  ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Grid,
  Select,
  Text,
} from "@chakra-ui/react";
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
    <Grid templateColumns="75% 25%" gap={5} mb="60px">
    <Box>
    <Button as={Link} to="/" mb="10px"><ChevronLeftIcon />GO BACK HOME</Button>
    <Box id="cart-list">
      {
        cart.map((item) => <CartItem key={item.id} item={item} />)
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
    <Box>
      <Text as="p" fontWeight="bold">Choose an address:</Text>
      <Select>
        <option>Hello</option>
        <option>Hello</option>
        <option>Hello</option>
        <option>Hello</option>
      </Select>
    </Box>
    </Grid>
  ) : (
    <Box d="flex" flexDirection="column" justifyContent="center" alignItems="center" h="500px">
    <Box>
      <Text as="h2" fontSize="20px" textAlign="center">CART IS EMPTY</Text>
      <Button as={Link} to="/">ADD TO ITEMS CART</Button>
    </Box>
    </Box>
  );
};

export default CartPage;
