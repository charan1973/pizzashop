import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DeleteAlert from "../delete-alert/DeleteAlert.component";
import { getAllCategory, deleteCategoryCB } from "./category.helper";

const ManageCategory = () => {
  const toast = useToast();
  const [allCategory, setAllCategory] = useState([]);
  const [deleteCategory, setDeleteCategory] = useState({
    showDeleteAlert: false,
    categoryToRemove: "",
  });

  const { showDeleteAlert, categoryToRemove } = deleteCategory;

  const onDeleteClose = () =>
    setDeleteCategory({ ...deleteCategory, showDeleteAlert: false });

  useEffect(() => {
    getAllCategory().then((response) => {
      const data = response.data;
      if (data.category) {
        setAllCategory(data.category);
      }
    });
  }, [deleteCategory]);

  const handleDeleteClick = () => {
    deleteCategoryCB(categoryToRemove).then((response) => {
      const data = response.data;
      if (data.message) {
        setDeleteCategory({ categoryToRemove: "", showDeleteAlert: false });
        toast({
          title: "Deleted",
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

  return (
    <Box>
      <Text as="h2" textAlign="center" fontWeight="bold" fontSize="25px">
        Manage Categories
      </Text>
      <Box>
        {allCategory.map((category) => {
          return (
            <div key={category._id}>
              <Flex
                my="15px"
                justifyContent="space-between"
                alignItems="center"
              >
                <span>{category.categoryName}</span>
                <div>
                  <Button
                    mx="10px"
                    bg="red.600"
                    onClick={() => {
                      setDeleteCategory({
                        showDeleteAlert: true,
                        categoryToRemove: category._id,
                      });
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                </div>
              </Flex>
              <Divider />
            </div>
          );
        })}
      </Box>

      {/* Delete Dialog */}
      <DeleteAlert
        showAlert={showDeleteAlert}
        handleCancelClick={onDeleteClose}
        handleDeleteClick={handleDeleteClick}
      />
    </Box>
  );
};

export default ManageCategory;
