import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { ItemContext } from "../../context/item/ItemContext";
import { SHOW_DRAWER } from "../../context/item/itemTypes";

const ItemDirectory = ({ items, filterId }) => {
    const {itemDispatch} = useContext(ItemContext)
    const history = useHistory()


    const customizeItem = (itemId) => {
      itemDispatch({type: SHOW_DRAWER})
      history.push(`/?item=${itemId}`)
    }

  return (
    <>
      {items
        .filter((item) => item.itemCategory._id === filterId)
        .map((item) => {
          return (
            <Box
              key={item._id}
              my="10px"
              maxW="sm"
              borderWidth="1px"
              borderRadius="5px"
              overflow="hidden"
              boxShadow="2xl"
            >
              <Image
                height="250px"
                width="100%"
                src={item.image.url}
                alt="alt"
              />
              <Box p="6">
                <Box display="flex" flexDirection="column" py="10px">
                  <Heading as="h5" fontWeight="bold" fontSize="20px" py="20px">
                    {item.itemName}
                  </Heading>
                  <Text>Starting @ ₹{item.size.regular}</Text>
                  <Flex justifyContent="space-between">
                    <Button w="90%" _focus={{ outline: "none" }}>
                      ADD TO CART
                    </Button>
                    <Button
                      w="90%"
                      _focus={{ outline: "none" }}
                      color="white"
                      bg="blue.400"
                      onClick={() => customizeItem(item._id)}
                    >
                      CUSTOMIZE
                    </Button>
                  </Flex>
                </Box>
              </Box>
            </Box>
          );
        })}
    </>
  );
};

export default ItemDirectory;
