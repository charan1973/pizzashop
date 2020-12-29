import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { createAddOn } from "./addon-helper";

const AddAddOn = () => {
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [addOn, setAddOn] = useState({
    addOnName: "",
    addOnType: "",
    addOnPrice: "",
    addOnAvailable: true,
  });

  const { addOnName, addOnPrice } = addOn;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddOn({ ...addOn, [name]: value });
  };

  const handleSubmit = (e) => {
      setLoading(true)
      e.preventDefault()
      createAddOn(addOn)
      .then(response => {
          const data = response.data
          setLoading(false)
          if(data.message){
              toast({
                  title: "AddOn",
                  description: data.message,
                  status: "success"
              })
              setAddOn({addOnName: "", addOnPrice: "", addOnType: "", addOnAvailable: ""})
          }else if(data.error){
              toast({
                  title: "Error",
                  description: data.error,
                  status: "error"
              })
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
      <FormLabel>AddOn Name</FormLabel>
        <Input
          mb="10px"
          variant="outline"
          name="addOnName"
          placeholder="AddOn Name"
          type="text"
          value={addOnName}
          onChange={handleChange}
        />
      <FormLabel>AddOn Price</FormLabel>
        <Input
          mb="10px"
          name="addOnPrice"
          variant="outline"
          placeholder="AddOn Price"
          type="number"
          value={addOnPrice}
          onChange={handleChange}
        />
        <RadioGroup mb="10px">
          <Stack direction="row">
            <Radio name="addOnType" value="topping" onChange={handleChange}>
              Topping
            </Radio>
            <Radio name="addOnType" value="addon" onChange={handleChange}>
              AddOn
            </Radio>
          </Stack>
        </RadioGroup>
        <Checkbox
          mb="10px"
          onChange={(e) =>
            setAddOn({ ...addOn, addOnAvailable: e.target.checked })
          }
          defaultIsChecked
        >
          AddOn Available
        </Checkbox>
        <Button onClick={handleSubmit} w="100%">{loading ? <Spinner /> : "ADD"}</Button>
      </form>
    </Box>
  );
};

export default AddAddOn;
