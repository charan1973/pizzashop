import { DeleteIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Divider,
  Flex,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAllCategory, deleteCategoryCB } from "./category-helper";

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
      <Text as="h6" textAlign="center" fontWeight="bold" fontSize="25px">
        All Categories
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
      <AlertDialog isOpen={showDeleteAlert} onClose={onDeleteClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete category
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onDeleteClose}>Cancel</Button>
              <Button colorScheme="red" onClick={handleDeleteClick} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default ManageCategory;
