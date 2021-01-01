import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { addOnCreateOrUpdate } from "./addon.helper";

const AddOnForm = ({
  isOpen,
  onClose,
  addOnName="",
  addOnType="",
  addOnPrice="",
  addOnAvailable=true,
  formType="create",
  addOnId=""
}) => {
  const toast = useToast();

  const [addOn, setAddOn] = useState({
    addOnName,
    addOnType,
    addOnPrice,
    addOnAvailable,
    addOnId,
    formType,
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddOn({ ...addOn, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addOnCreateOrUpdate(addOn).then(({data}) => {
      if (data.message) {
        toast({
          title: "AddOn",
          description: data.message,
          status: "success",
        });
        setAddOn({
          addOnId: "",
          addOnPrice: "",
          addOnAvailable: false,
          addOnType: "",
          formType: "",
          addOnName: ""
        })
      } else if (data.error) {
        toast({
          title: "Error",
          description: data.error,
          status: "error",
        });
      }
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
      <ModalBody>
        <Box
          my="15%"
        >
          <Text as="h4" fontWeight="bold" textAlign="center">
            {formType.toUpperCase()} category
          </Text>
          <form>
            <FormLabel>AddOn Name</FormLabel>
            <Input
              mb="10px"
              variant="outline"
              name="addOnName"
              placeholder="AddOn Name"
              type="text"
              value={addOn.addOnName}
              onChange={handleChange}
            />
            <FormLabel>AddOn Price</FormLabel>
            <Input
              mb="10px"
              name="addOnPrice"
              variant="outline"
              placeholder="AddOn Price"
              type="number"
              value={addOn.addOnPrice}
              onChange={handleChange}
            />
            <RadioGroup mb="10px" value={addOn.addOnType} onChange={(value) => setAddOn({...addOn, addOnType: value})}>
              <Stack direction="row">
                <Radio name="addOnType" value="topping" checked={addOn.addOnType === "topping"}>
                  Topping
                </Radio>
                <Radio name="addOnType" value="addon" checked={addOn.addOnType === "topping"}>
                  AddOn
                </Radio>
              </Stack>
            </RadioGroup>
            <Checkbox
              mb="10px"
              onChange={(e) =>
                setAddOn({ ...addOn, addOnAvailable: e.target.checked })
              }
              isChecked={addOn.addOnAvailable}
            >
              AddOn Available
            </Checkbox>
            <Box d="flex" justifyContent="space-around">
            <Button onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleSubmit}>
              {formType}
            </Button>
            </Box>
          </form>
        </Box>
      </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddOnForm;
