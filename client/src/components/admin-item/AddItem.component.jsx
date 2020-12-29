import { useEffect, useState } from "react";
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
import ImageUploader from 'react-images-upload';
import { getAllCategory } from "../admin-category/category-helper";
import { createItem } from "./item-helper";

const AddItem = () => {
  const toast = useToast();
  const [categories, setCategories] = useState([]);
  const [item, setItem] = useState({
    itemName: "",
    itemCategory: "",
    itemAvailable: false,
    size: {
      regular: "",
      medium: "",
      large: "",
    },
    image: []
  });

  useEffect(() => {
    getAllCategory().then(({ data }) => {
      if (data.category) {
        setCategories(data.category);
      }
    });
  }, []);

  useEffect(() => {
    console.log(item);
  }, [item])

  const { size, itemAvailable, itemCategory, itemName, image } = item;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSizeChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, size: { ...size, [name]: value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("itemName", itemName)
    formData.append("itemAvailable", itemAvailable)
    formData.append("itemCategory", itemCategory)
    formData.append("size", JSON.stringify(size))
    formData.append("image", image[0])
    
    createItem(formData).then(({ data }) => {
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
        image: []
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
      <form onSubmit={handleSubmit}>
      <ImageUploader
                fileContainerStyle={{backgroundColor: "#2D3748"}}
                withIcon={false}
                singleImage={true}
                withPreview={true}
                buttonText="Choose item image"
                label="Max file size: 1mb, accepted: jpg, png"
                labelStyles={{color: "#fff"}}
                onChange={(image) => setItem({...item, image})}
                imgExtension={['.jpg', '.png']}
                maxFileSize={1048576}
                name="image"
            />
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
        <Button w="100%" type="submit">
          ADD
        </Button>
      </form>
    </Box>
  );
};

export default AddItem;
