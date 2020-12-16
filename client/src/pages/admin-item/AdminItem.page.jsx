import { Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import AddItem from "../../components/admin-item-components/AddItem.component";
import ManageItem from "../../components/admin-item-components/ManageItem.component";
import AdminLayout from "../../components/admin-layout/AdminLayout.component";

const AdminItem = () => {

    const [view, setView] = useState(true)

  return (
    <AdminLayout sectionTitle="Item">
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
      {!view && <AddItem />}
      {view && <ManageItem />}
    </AdminLayout>
  );
};

export default AdminItem;
