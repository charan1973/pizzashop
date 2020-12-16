import { Badge, Text } from "@chakra-ui/react";
import { useContext } from "react";
import AdminLayout from "../../components/admin-layout/AdminLayout.component";
import { UserContext } from "../../context/user/UserContext";


const AdminHome = () => {
  const {user} = useContext(UserContext)

  return (
    <AdminLayout sectionTitle="Admin Info">
      <Text py="20px"><strong>Name:</strong> {user.name}</Text>
      <Text py="20px"><strong>Email:</strong> {user.email}</Text>
      <Badge variant="subtle" colorScheme="green">Admin Area</Badge>
    </AdminLayout>
  );
};

export default AdminHome;
