import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DeleteAlert from "../delete-alert/DeleteAlert.component";
import { deleteAddOnCB, getAllAddOn, updateAddOnCB } from "./addon.helper";

const ManageAddOn = () => {
  const [allAddOn, setAllAddOn] = useState([]);
  const toast = useToast();

  const [deleteAddOn, setDeleteAddOn] = useState({
    showDeleteAlert: false,
    addOnToRemove: "",
  });

  const [updateAddOn, setUpdateAddOn] = useState({
    showUpdateModal: false,
    addOnToUpdate: {
      addOnName: "",
      addOnPrice: "",
      addOnAvailable: "",
      addOnType: "",
      addOnId: "",
    },
  });

  useEffect(() => {
    getAllAddOn().then(({ data }) => {
      if (data.addon) {
        setAllAddOn(data.addon);
      }
    });
  }, [deleteAddOn, updateAddOn.showUpdateModal]);

  const { showDeleteAlert, addOnToRemove } = deleteAddOn;
  const { addOnToUpdate } = updateAddOn;

  const handleDeleteClick = () => {
    deleteAddOnCB(addOnToRemove).then(({ data }) => {
      setDeleteAddOn({ addOnToRemove: "", showDeleteAlert: false });
      if (data.message) {
        toast({
          title: "Delete AddOn",
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
    });
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateAddOn({
      ...updateAddOn,
      addOnToUpdate: { ...addOnToUpdate, [name]: value },
    });
  };

  const handleUpdateClick = () => {
    updateAddOnCB(addOnToUpdate.addOnId, { ...addOnToUpdate }).then(
      ({ data }) => {
        if (data.message) {
          toast({
            title: "Addon Update",
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
        setUpdateAddOn({
          showUpdateModal: false,
          addOnToUpdate: {
            addOnName: "",
            addOnPrice: "",
            addOnType: "",
            addOnAvailable: "",
          },
        });
      }
    );
  };

  return (
    <Box>
      <Text as="h6" textAlign="center" fontWeight="bold" fontSize="25px">
        All AddOn
      </Text>
      <Accordion allowToggle>
        {allAddOn.map((addon) => {
          return (
            <AccordionItem key={addon._id}>
              <AccordionButton
                justifyContent="space-between"
                alignItems="center"
              >
                <div>
                  <AccordionIcon />
                  <span>{addon.addOnName}</span>
                </div>
                <Box d="flex"> 
                  <Box
                    mx="10px"
                    bg="red.600"
                    borderRadius="5px" 
                    p="6px"
                    onClick={() =>
                      setDeleteAddOn({
                        showDeleteAlert: true,
                        addOnToRemove: addon._id,
                      })
                    }
                  >
                    <DeleteIcon />
                  </Box>
                  <Box
                    mx="10px"
                    bg="green.400"
                    p="6px"
                    borderRadius="5px"
                    onClick={() =>
                      setUpdateAddOn({
                        addOnToUpdate: {
                          addOnName: addon.addOnName,
                          addOnPrice: addon.addOnPrice,
                          addOnType: addon.addOnType,
                          addOnAvailable: addon.addOnAvailable,
                          addOnId: addon._id,
                        },
                        showUpdateModal: true,
                      })
                    }
                  >
                    <EditIcon />
                  </Box>
                </Box>
              </AccordionButton>
              <AccordionPanel color="gray.400">
                <p>
                  Addon Price: <b>{addon.addOnPrice}</b>
                </p>
                <p>
                  Addon type: <b>{addon.addOnType}</b>
                </p>
                <p>
                  Addon Available: <b>{addon.addOnAvailable ? "Yes" : "No"}</b>
                </p>
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>

      <DeleteAlert
        showAlert={showDeleteAlert}
        handleCancelClick={() =>
          setDeleteAddOn({ ...deleteAddOn, showDeleteAlert: false })
        }
        handleDeleteClick={handleDeleteClick}
      />

      {/* Update Modal */}
      <Modal isOpen={updateAddOn.showUpdateModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update AddOn</ModalHeader>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>AddOn Name</FormLabel>
              <Input
                placeholder="AddOn Name"
                name="addOnName"
                type="text"
                value={addOnToUpdate.addOnName}
                onChange={handleUpdateChange}
              />
              <FormLabel>AddOn Price</FormLabel>
              <Input
                placeholder="AddOn Price"
                name="addOnPrice"
                type="number"
                value={addOnToUpdate.addOnPrice}
                onChange={handleUpdateChange}
              />
              <RadioGroup mb="10px">
                <Stack direction="row">
                  <Radio
                    name="addOnType"
                    value="topping"
                    onChange={handleUpdateChange}
                    isChecked={addOnToUpdate.addOnType === "topping"}
                  >
                    Topping
                  </Radio>
                  <Radio
                    name="addOnType"
                    value="addon"
                    onChange={handleUpdateChange}
                    isChecked={addOnToUpdate.addOnType === "addon"}
                  >
                    AddOn
                  </Radio>
                </Stack>
              </RadioGroup>
              <Checkbox
                mb="10px"
                onChange={(e) =>
                  setUpdateAddOn({
                    ...updateAddOn,
                    addOnToUpdate: {
                      ...addOnToUpdate,
                      addOnAvailable: e.target.checked,
                    },
                  })
                }
                isChecked={addOnToUpdate.addOnAvailable}
              >
                AddOn Available
              </Checkbox>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdateClick}>
              Save
            </Button>
            <Button
              onClick={() =>
                setUpdateAddOn({ ...updateAddOn, showUpdateModal: false })
              }
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ManageAddOn;
