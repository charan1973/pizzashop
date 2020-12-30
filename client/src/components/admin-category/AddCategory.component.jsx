import { Box, Button, Input, Spinner, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { addCategory } from "./category.helper";

const AddCategory = () => {
  const toast = useToast()

  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    addCategory(categoryName)
    .then(response => {
        const data = response.data
        if(data.message){
            setLoading(false)
            toast({
                title: "Add Category",
                description: data.message,
                status: "success"
            })
            setCategoryName("")
        }else if(data.error){
            setLoading(false)
            toast({
                title: "Error",
                description: data.error,
                status: "error"
            })
            setCategoryName("")
        }
    })
  }

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
        Add Category
      </Text>
      <form>
        <Input
          my="10px"
          variant="outline"
          placeholder="Category Name"
          onChange={(e) => setCategoryName(e.target.value)}
          value={categoryName}
        />
        <Button onClick={handleSubmit} w="100%">{loading ? <Spinner /> : "ADD"}</Button>
      </form>
    </Box>
  );
};

export default AddCategory;
