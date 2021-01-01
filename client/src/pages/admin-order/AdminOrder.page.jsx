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
import CartItem from "../../components/cart-item/cart-item.component"
import { getAllOrders } from "./admin-order.helper";
import {calculateTotal} from "../cart/cart.helper"

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
  const [orderEdit, setOrderEdit] = useState({
    openModal: false
  })

  useEffect(() => {
    getAllOrders().then(({ data }) => {
      setOrders(data.orders);
    });
  }, []);

  const openOrder = (order) => {
    console.log(order);
    setOrderEdit({...order, openModal: true})
  }

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
              onClick={() => openOrder(order)}
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
      {
        orderEdit.openModal && (
      <Modal 
      isOpen={orderEdit.openModal} onClose={() => setOrderEdit({...orderEdit, openModal: false})}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order View</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {
              orderEdit.orderContent.map(item => {
                return <CartItem item={item} admin />
              })
            }
            <Text as="p" fontSize="15px" textAlign="right">Total: {calculateTotal(orderEdit.orderContent)}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => setOrderEdit({...orderEdit, openModal: false})}>
              Close
            </Button>
            <Button variant="ghost">Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        )
      }
    </AdminLayout>
  );
};

export default AdminOrder;
