import { AddIcon, CloseIcon, DeleteIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  IconButton,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useContext } from "react";
import {
  deleteFromCartAction,
  increaseDecreaseQuantityAction,
} from "../../context/item/item.actions";
import { ItemContext } from "../../context/item/ItemContext";

const eachItemPrice = (item) => {
  return (
    item.itemPrice + item.addOn.reduce((b, addOn) => b + addOn.addOnPrice, 0)
  );
};

const CartItem = ({ item, admin }) => {
  const { itemDispatch } = useContext(ItemContext);
  return (
    <Box
      key={item.id}
      borderWidth="1px"
      borderRadius="lg"
      mb="4px"
      boxShadow="md"
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        p="10px"
      >
        <Text as="p" fontSize="20px">
          {item.itemName}
        </Text>
        <Flex alignItems="center">
          <Text mr="10px">{item.itemSize}</Text>
          {!admin && (
            <IconButton
              _focus={{ outline: "none" }}
              icon={<DeleteIcon />}
              bg="red.500"
              onClick={() => itemDispatch(deleteFromCartAction(item.id))}
            />
          )}
        </Flex>
      </Flex>
      <Divider />
      <Flex p="10px" justifyContent="space-between" alignItems="center">
        <Box mr="13px">
          <Text as="p" fontSize="15px" fontWeight="bold">
            Add On
          </Text>
          <UnorderedList style={{ textIndent: "10px" }}>
            {item.addOn.length > 0 ? (
              item.addOn.map((addOn) => {
                return (
                  <ListItem key={addOn._id}>
                    {addOn.addOnName} - {addOn.addOnPrice}
                  </ListItem>
                );
              })
            ) : (
              <Text color="gray.500">No Add On</Text>
            )}
          </UnorderedList>
        </Box>
        <Box>
          {!admin && (
            <IconButton
              icon={<AddIcon />}
              onClick={() =>
                itemDispatch(
                  increaseDecreaseQuantityAction(item.id, "increase")
                )
              }
            />
          )}
          <Text as="span" m="5px">
            {item.quantity}<CloseIcon h="9px" />{eachItemPrice(item)}
          </Text>
          {!admin && (
            <IconButton
              icon={<MinusIcon />}
              onClick={() =>
                itemDispatch(
                  increaseDecreaseQuantityAction(item.id, "decrease")
                )
              }
            />
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default CartItem;
