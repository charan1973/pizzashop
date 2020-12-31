import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import moment from "moment";

import AdminLayout from "../../components/admin-layout/AdminLayout.component";
import { getAllOrders } from "./admin-order.helper";

const AdminOrder = () => {
  const orderStatus = [
    "pending",
    "accepted",
    "completed",
    "delivered",
    "cancelled",
  ];
  const [orderStatusType, setOrderStatusType] = useState("pending");
  const [orders, setOrders] = useState([]);
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    getAllOrders().then(({ data }) => {
      setOrders(data.orders);
    });
  }, []);

  return (
    <AdminLayout sectionTitle="Order">
      <Box d="flex" justifyContent="space-around">
        {orderStatus.map((btn, idx) => (
          <Button
            key={idx}
            disabled={btn === orderStatusType}
            onClick={() => setOrderStatusType(btn)}
          >
            {btn}
          </Button>
        ))}
      </Box>
      <SimpleGrid columns={4} spacing={10} mt="30px">
        {orders
          .filter((orders) => orders.orderStatus === orderStatusType)
          .map((order) => (
            <Box
              onClick={() => setOpenModal(true)}
              key={order._id}
              w="200px"
              borderWidth="1px"
              borderRadius="lg"
              cursor="pointer"
              p="10px"
            >
              <Text as="p">Order by {order.customer.fullName}</Text>
              <Text as="p">Order id: {order._id.slice(0, 12) + "..."}</Text>
              <Text as="p">Order Total: ₹{order.orderPrice}</Text>
              <Text as="span" color="gray.500">
                {moment(order.createdAt).fromNow()}
              </Text>
            </Box>
          ))}
      </SimpleGrid>
      <Modal 
      isOpen={openModal} onClose={() => setOpenModal(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Something</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </AdminLayout>
  );
};

export default AdminOrder;
