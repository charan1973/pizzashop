import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import ImageUploader from "react-images-upload";
import { getAllCategory } from "../admin-category/category.helper";
import { createOrUpdateItem } from "./item.helper";

const ItemForm = ({
  isOpen,
  onClose,
  itemId = "",
  itemName = "",
  itemAvailable = false,
  itemCategory = "",
  size={regular: "", medium: "", large: ""},
  formType="create"
}) => {
  const toast = useToast();
  const [categories, setCategories] = useState([]);
  const [item, setItem] = useState({
    itemName,
    itemCategory,
    itemAvailable,
    size: {
      regular: size.regular,
      medium: size.medium,
      large: size.large,
    },
    image: [],
    itemId
  });

  useEffect(() => {
    getAllCategory().then(({ data }) => {
      if (data.category) {
        setCategories(data.category);
      }
    });
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSizeChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, size: { ...item.size, [name]: value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data;

    if(formType === "update"){
      data={...item}
    }else if(formType === "create"){
      const formData = new FormData();
      formData.append("itemName", item.itemName);
      formData.append("itemAvailable", item.itemAvailable);
      formData.append("itemCategory", item.itemCategory);
      formData.append("size", JSON.stringify(item.size));
      formData.append("image", item.image[0]);
      data = formData
    }



    createOrUpdateItem(data, formType).then(({ data }) => {
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
        image: [],
      });
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Box p="20px">
            <Text as="h4" fontWeight="bold" textAlign="center">
              {formType.toUpperCase()} Item
            </Text>
            <form onSubmit={handleSubmit}>
            {formType === "create" && 
              <ImageUploader
                fileContainerStyle={{ backgroundColor: "#2D3748" }}
                withIcon={false}
                singleImage={true}
                withPreview={true}
                buttonText="Choose item image"
                label="Max file size: 1mb, accepted: jpg, png"
                labelStyles={{ color: "#fff" }}
                onChange={(image) => setItem({ ...item, image })}
                imgExtension={[".jpg", ".png"]}
                maxFileSize={1048576}
                name="image"
              />
            }
              <Input
                my="10px"
                variant="outline"
                placeholder="Item Name"
                name="itemName"
                value={item.itemName}
                onChange={handleChange}
              />
              <Select
                placeholder="Select Category"
                name="itemCategory"
                value={item.itemCategory}
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
                  value={item.size.regular}
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
                  value={item.size.medium}
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
                  value={item.size.large}
                  onChange={handleSizeChange}
                />
              </InputGroup>
              <Checkbox
                my="10px"
                value={item.itemAvailable}
                onChange={(e) =>
                  setItem({ ...item, itemAvailable: e.target.checked })
                }
                isChecked={item.itemAvailable}
              >
                Item Availability
              </Checkbox>
              <Button w="100%" type="submit">
                ADD
              </Button>
            </form>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ItemForm;
