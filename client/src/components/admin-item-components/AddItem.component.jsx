import {
  Box,
  Button,
  Checkbox,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAllCategory } from "../admin-category-components/category-helper";
import { createItem } from "./item-helper";

const AddItem = () => {
  const toast = useToast();
  const [categories, setCategories] = useState([]);
  const [item, setItem] = useState({
    itemName: "",
    itemCategory: "",
    itemAvailable: "",
    size: {
      regular: "",
      medium: "",
      large: "",
    },
  });

  useEffect(() => {
    getAllCategory().then(({ data }) => {
      if (data.category) {
        setCategories(data.category);
      }
    });
  }, []);

  const { size, itemAvailable, itemCategory, itemName } = item;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSizeChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, size: { ...size, [name]: value } });
  };

  const handleSubmit = () => {
    createItem(item).then(({ data }) => {
      if (data.message) {
        toast({
          title: "Add Item",
          description: data.message,
          status: "success",
        });
      } else if (data.error) {
        toast({
          title: "Error",
          description: data.error,
          status: "error",
        });
      }
      setItem({
        itemName: "",
        itemAvailable: "",
        itemCategory: "",
        size: { regular: "", medium: "", large: "" },
      });
    });
  };

  return (
    <Box
      w="40%"
      mx="auto"
      my="15%"
      border="0.1px solid #000"
      p="20px"
      borderRadius="10px"
    >
      <Text as="h4" fontWeight="bold" textAlign="center">
        Add Item
      </Text>
      <form>
        <Input
          my="10px"
          variant="outline"
          placeholder="Item Name"
          name="itemName"
          value={itemName}
          onChange={handleChange}
        />
        <Select
          placeholder="Select Category"
          name="itemCategory"
          value={itemCategory}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.categoryName}
            </option>
          ))}
        </Select>
        <InputGroup my="10px">
          <InputLeftAddon>Regular</InputLeftAddon>
          <Input
            type="number"
            borderLeftRadius="0"
            placeholder="Regular"
            name="regular"
            value={size.regular}
            onChange={handleSizeChange}
          />
        </InputGroup>
        <InputGroup my="10px">
          <InputLeftAddon>Medium</InputLeftAddon>
          <Input
            type="number"
            borderLeftRadius="0"
            placeholder="Medium"
            name="medium"
            value={size.medium}
            onChange={handleSizeChange}
          />
        </InputGroup>
        <InputGroup my="10px">
          <InputLeftAddon>Large</InputLeftAddon>
          <Input
            type="number"
            borderLeftRadius="0"
            placeholder="Large"
            name="large"
            value={size.large}
            onChange={handleSizeChange}
          />
        </InputGroup>
        <Checkbox
          my="10px"
          value={itemAvailable}
          onChange={(e) =>
            setItem({ ...item, itemAvailable: e.target.checked })
          }
        >
          Item Availability
        </Checkbox>
        <Button w="100%" onClick={handleSubmit}>
          ADD
        </Button>
      </form>
    </Box>
  );
};

export default AddItem;
