import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Divider, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAllItems } from "./item-helper";

const ManageItem = () => {
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    getAllItems().then(({ data }) => {
      if (data.item) {
        setAllItems(data.item);
      }
    });
  }, []);

  return (
    <Box>
      {allItems.map((item) => {
        return (
          <div key={item._id}>
            <Flex my="15px" justifyContent="space-between" alignItems="center">
              <span>{item.itemName}</span>
              <span>{item.itemCategory.categoryName}</span>
              <Text as="span" color={`${item.itemAvailable ? "" : "red.400"}`}>
                {item.itemAvailable ? "available" : "unavailable"}
              </Text>
              <div>
                <Button mx="10px" bg="red.600">
                  <DeleteIcon />
                </Button>
                <Button mx="10px" bg="green.400">
                  <EditIcon />
                </Button>
              </div>
            </Flex>
            <Divider />
          </div>
        );
      })}
    </Box>
  );
};

export default ManageItem;
