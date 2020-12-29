import { Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import AddCategory from "../../components/admin-category/AddCategory.component";
import AdminLayout from "../../components/admin-layout/AdminLayout.component";
import ManageCategory from "../../components/admin-category/ManageCategory.component";

const AdminCategory = ({ match }) => {
  const [view, setView] = useState(true);
  return (
    <AdminLayout sectionTitle="Category">
      <Flex flexDirection="row" justifyContent="space-around">
        <Button bg={`${!view ? 'pink.300' : 'gray.700'}`} onClick={() => setView(false)}>Add</Button>
        <Button bg={`${view ? 'pink.300' : 'gray.700'}`} onClick={() => setView(true)}>Manage</Button>
      </Flex>
      {!view ? <AddCategory /> : <ManageCategory />}
    </AdminLayout>
  );
};

export default AdminCategory;
