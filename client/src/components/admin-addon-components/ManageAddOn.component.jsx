import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
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
import { deleteAddOnCB, getAllAddOn, updateAddOnCB } from "./addon-helper";

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
    const {name, value} = e.target
    setUpdateAddOn({...updateAddOn, addOnToUpdate: {...addOnToUpdate, [name]: value}})
  }

  const handleUpdateClick = () => {
    updateAddOnCB(addOnToUpdate.addOnId, {...addOnToUpdate})
    .then(({data}) => {
      if(data.message){
        toast({
          title: "Addon Update",
          description: data.message,
          status: "success"
        })
      }else if(data.error){
        toast({
          title: "Error",
          description: data.error,
          status: "error"
        })
      }
      setUpdateAddOn({showUpdateModal: false, addOnToUpdate: {addOnName: "", addOnPrice: "", addOnType: "", addOnAvailable: ""}})
    })
  }


  return (
    <Box>
      <Text as="h6" textAlign="center" fontWeight="bold" fontSize="25px">
        All AddOn
      </Text>
      <Box>
        {allAddOn.map((addon) => {
          return (
            <div key={addon._id}>
              <Flex
                my="15px"
                justifyContent="space-between"
                alignItems="center"
              >
                <span>{addon.addOnName}</span>
                <span>{addon.addOnPrice}</span>
                <span>{addon.addOnType}</span>
                <Text
                  as="span"
                  color={`${addon.addOnAvailable ? "" : "red.400"}`}
                >
                  {addon.addOnAvailable ? "available" : "unavailable"}
                </Text>
                <div>
                  <Button
                    mx="10px"
                    bg="red.600"
                    onClick={() =>
                      setDeleteAddOn({
                        showDeleteAlert: true,
                        addOnToRemove: addon._id,
                      })
                    }
                  >
                    <DeleteIcon />
                  </Button>
                  <Button
                    mx="10px"
                    bg="green.400"
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
                  </Button>
                </div>
              </Flex>
              <Divider />
            </div>
          );
        })}
      </Box>

      {/* Delete Dialog */}
      <AlertDialog isOpen={showDeleteAlert}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete AddOn
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                onClick={() =>
                  setDeleteAddOn({ ...deleteAddOn, showDeleteAlert: false })
                }
              >
                Cancel
              </Button>
              <Button colorScheme="red" ml={3} onClick={handleDeleteClick}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

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
                  <Radio name="addOnType" value="topping" onChange={handleUpdateChange} isChecked={addOnToUpdate.addOnType === "topping"}>
                    Topping
                  </Radio>
                  <Radio name="addOnType" value="addon" onChange={handleUpdateChange} isChecked={addOnToUpdate.addOnType === "addon"}>
                    AddOn
                  </Radio>
                </Stack>
              </RadioGroup>
              <Checkbox mb="10px" onChange={(e) => setUpdateAddOn({...updateAddOn, addOnToUpdate: {...addOnToUpdate, addOnAvailable: e.target.checked}})} isChecked={addOnToUpdate.addOnAvailable}>
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
