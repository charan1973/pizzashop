import { Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import ItemForm from "../../components/admin-item/ItemForm.component";
import ManageItem from "../../components/admin-item/ManageItem.component";
import AdminLayout from "../../components/admin-layout/AdminLayout.component";

const AdminItem = () => {

    const [view, setView] = useState(false)

  return (
    <AdminLayout sectionTitle="Item">
      <Flex flexDirection="row" justifyContent="space-around">
        <Button
          onClick={() => setView(true)}
        >
          Add Item
        </Button>
      </Flex>
      {view && <ItemForm isOpen={view} onClose={() => setView(false)} />}
      <ManageItem />
    </AdminLayout>
  );
};

export default AdminItem;
