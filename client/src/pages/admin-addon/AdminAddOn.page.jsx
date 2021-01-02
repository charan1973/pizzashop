import { Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import AddAddOn from "../../components/admin-addon/AddOnForm.component";
import ManageAddOn from "../../components/admin-addon/ManageAddOn.component";
import AdminLayout from "../../components/admin-layout/AdminLayout.component";

const AdminAddOn = () => {
  const [view, setView] = useState(false);
  return (
    <AdminLayout sectionTitle="AddOn">
    <Box w="100%" textAlign="center" mb="20px">
        <Button w="20%" bg="red.400" onClick={() => setView(true)}>Create AddOn</Button>
    </Box>
      <ManageAddOn />
      {
        view &&(
      <AddAddOn
        formType="create"
        isOpen={view}
        onClose={() => setView(false)}
      />
        )
      }
    </AdminLayout>
  );
};

export default AdminAddOn;
