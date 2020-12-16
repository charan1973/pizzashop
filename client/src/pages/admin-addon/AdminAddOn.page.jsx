import { Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import AddAddOn from "../../components/admin-addon-components/AddAddOn.component";
import ManageAddOn from "../../components/admin-addon-components/ManageAddOn.component";
import AdminLayout from "../../components/admin-layout/AdminLayout.component";

const AdminAddOn = () => {

    const [view, setView] = useState(true)
  return (
    <AdminLayout sectionTitle="AddOn">
      <Flex flexDirection="row" justifyContent="space-around">
        <Button
          bg={`${!view ? "pink.300" : "gray.700"}`}
          onClick={() => setView(false)}
        >
          Add
        </Button>
        <Button
          bg={`${view ? "pink.300" : "gray.700"}`}
          onClick={() => setView(true)}
        >
          Manage
        </Button>
      </Flex>
      {!view ? <AddAddOn /> : <ManageAddOn />}
    </AdminLayout>
  );
};

export default AdminAddOn;
