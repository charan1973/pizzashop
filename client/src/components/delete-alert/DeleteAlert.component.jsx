import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react";

const DeleteAlert = ({name, showAlert, handleCancelClick, handleDeleteClick}) => {
  
  return ( 
        <AlertDialog 
        isOpen={showAlert}
        >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete {name}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                onClick={handleCancelClick}
              >
                Cancel
              </Button>
              <Button colorScheme="red" ml={3} 
              onClick={handleDeleteClick}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
     );
}
 
export default DeleteAlert;