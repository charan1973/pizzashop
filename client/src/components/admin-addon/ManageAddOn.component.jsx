import { DeleteIcon, EditIcon, RepeatIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DeleteAlert from "../delete-alert/DeleteAlert.component";
import AddAddOn from "./AddOnForm.component";
import { deleteAddOnCB, getAllAddOn } from "./addon.helper";

const ManageAddOn = () => {
  const [allAddOn, setAllAddOn] = useState([]);
  const toast = useToast();

  const [reload, setReload] = useState(false)

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
  }, [reload]);

  const { showDeleteAlert, addOnToRemove } = deleteAddOn;

  const handleDeleteClick = () => {
    deleteAddOnCB(addOnToRemove).then(({ data }) => {
      setDeleteAddOn({ addOnToRemove: "", showDeleteAlert: false });
      if (data.message) {
        toast({
          title: "Delete AddOn",
          description: data.message,
          status: "success",
        });
        setReload(!reload)
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
    <Box>
      <Box d="flex" justifyContent="center" mb="10px">
      <Text as="h6" fontWeight="bold" fontSize="25px">
        All AddOn
      </Text>
      <IconButton ml="10px" icon={<RepeatIcon />} onClick={() => setReload(!false)}/>
      </Box>
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
        name="AddOn"
        showAlert={showDeleteAlert}
        handleCancelClick={() =>
          setDeleteAddOn({ ...deleteAddOn, showDeleteAlert: false })
        }
        handleDeleteClick={handleDeleteClick}
      />
      {updateAddOn.showUpdateModal && (
        <AddAddOn
          formType="update"
          isOpen={updateAddOn.showUpdateModal}
          onClose={() =>
            setUpdateAddOn({ ...updateAddOn, showUpdateModal: false })
          }
          {...updateAddOn.addOnToUpdate}
        />
      )}
    </Box>
  );
};

export default ManageAddOn;
