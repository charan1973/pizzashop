import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAllItems } from "../../pages/home/home.helper";
import DeleteAlert from "../delete-alert/DeleteAlert.component";
import ItemForm from "./ItemForm.component";
import { deleteItemCB } from "./item.helper";

const ManageItem = () => {
  const toast = useToast();
  const [allItems, setAllItems] = useState([]);
  const [deleteItem, setDeleteItem] = useState({
    showDeleteAlert: false,
    deleteItemId: "",
  });
  const [updateItem, setUpdateItem] = useState({
    formType: "update",
    itemName: "",
    itemId: "",
    itemCategory: "",
    itemAvailable: false,
    size: {
      regular: "",
      medium: "",
      large: "",
    },
    showUpdateForm: false,
  });

  useEffect(() => {
    getAllItems().then(({ data }) => {
      if (data.item) {
        setAllItems(data.item);
      }
    });
  }, [deleteItem]);


  const { showDeleteAlert, deleteItemId } = deleteItem;

  const handleDeleteItem = () => {
    deleteItemCB(deleteItemId).then(({ data }) => {
      if (data.message) {
        toast({
          title: "Delete Item",
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
      setDeleteItem({ deleteItemId: "", showDeleteAlert: false });
    });
  };

  const handleSetUpdateItem = (item) => {
    setUpdateItem({
      ...updateItem,
      showUpdateForm: true,
      itemName: item.itemName,
      itemCategory: item.itemCategory._id,
      itemAvailable: item.itemAvailable,
      size: {
        regular: item.size.regular,
        medium: item.size.medium,
        large: item.size.large
      },
      itemId: item._id
    })
  }

  return (
    <Box mt="40px">
      <Text as="h2" textAlign="center" fontWeight="bold" fontSize="25px">
        Manage Items
      </Text>
      <Accordion allowToggle>
        {allItems.map((item) => {
          return (
            <AccordionItem key={item._id}>
              <AccordionButton display="flex" justifyContent="space-between">
                <div>
                  <AccordionIcon />
                  <span>{item.itemName}</span>
                </div>
                <Box d="flex">
                  <Box
                    mx="10px"
                    borderRadius="5px"
                    p="6px"
                    bg="red.600"
                    onClick={() =>
                      setDeleteItem({
                        deleteItemId: item._id,
                        showDeleteAlert: true,
                      })
                    }
                  >
                    <DeleteIcon />
                  </Box>
                  <Box
                    mx="10px"
                    bg="green.400"
                    borderRadius="5px"
                    p="6px"
                    onClick={() =>
                      handleSetUpdateItem(item)
                    }
                  >
                    <EditIcon />
                  </Box>
                </Box>
              </AccordionButton>
              <AccordionPanel>
                <Box
                  d="flex"
                  justifyContent="space-evenly"
                  borderRadius="10px"
                  color="gray.400"
                  p="10px"
                >
                  <Image h="190px" src={item.image.secure_url} alt="pizza" />
                  <Box>
                    <p>
                      Item Category: <b>{item.itemCategory.categoryName}</b>
                    </p>
                    <p>
                      Item Available: <b>{item.itemAvailable ? "Yes" : "No"}</b>
                    </p>
                    <Text as="h6" fontWeight="bold" color="gray.200" mt="10px">
                      Prices
                    </Text>
                    <Divider />
                    <ul>
                      <li>
                        Regular: <b>{item.size.regular}</b>
                      </li>
                      <li>
                        Medium: <b>{item.size.medium}</b>
                      </li>
                      <li>
                        Large: <b>{item.size.large}</b>
                      </li>
                    </ul>
                  </Box>
                </Box>
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
      <DeleteAlert
        name="Item"
        showAlert={showDeleteAlert}
        handleCancelClick={() =>
          setDeleteItem({ deleteItemId: "", showDeleteAlert: false })
        }
        handleDeleteClick={handleDeleteItem}
      />
      {updateItem.showUpdateForm && (
        <ItemForm
          isOpen={updateItem.showUpdateForm}
          onClose={() =>
            setUpdateItem({ ...updateItem, showUpdateForm: false })
          }
          {...updateItem}
        />
      )}
    </Box>
  );
};

export default ManageItem;
