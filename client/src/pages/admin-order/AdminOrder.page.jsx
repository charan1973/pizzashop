import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import moment from "moment";

import AdminLayout from "../../components/admin-layout/AdminLayout.component";
import CartItem from "../../components/cart-item/cart-item.component";
import { getAllOrders, updateOrderStatus } from "./admin-order.helper";

const AdminOrder = () => {
  const toast = useToast()
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
    openModal: false,
  });
  const [reload, setReload] = useState(false)

  useEffect(() => {
    getAllOrders().then(({ data }) => {
      setOrders(data.orders);
    });
  }, [reload]);

  const openOrder = (order) => {
    setOrderEdit({ ...order, openModal: true });
  };

  const handleOrderUpdate = () => {
    updateOrderStatus(orderEdit._id, orderEdit.orderStatus)
    .then(({data}) => {
      if(data.message){
        toast({
          title: "Order Updated",
          description: data.message,
          status: "success",
          duration: 2000
        })
        setOrderEdit({openModal: false})
        setReload(!reload)
      }
    })
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
              <Text as="p">Order id: {order._id.slice(0, 12) + "..."}</Text>
              <Text as="p">Order Total: ₹{order.orderPrice}</Text>
              <Text as="span" color="gray.500">
                {moment(order.createdAt).fromNow()}
              </Text>
            </Box>
          ))}
      </SimpleGrid>
      {orderEdit.openModal && (
        <Modal
          isOpen={orderEdit.openModal}
          onClose={() => setOrderEdit({ ...orderEdit, openModal: false })}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Order View</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Select
                value={orderEdit.orderStatus}
                onChange={(e) =>
                  setOrderEdit({ ...orderEdit, orderStatus: e.target.value })
                }
              >
                {orderStatus.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </Select>
              <Text as="p" fontSize="15px" m="15px" textAlign="right">
                Total: {orderEdit.orderPrice}
              </Text>
              <Accordion allowMultiple>
                <AccordionItem>
                  <AccordionButton>Show Order Content<AccordionIcon /></AccordionButton>
                  <AccordionPanel pb={4}>
                    {orderEdit.orderContent.map((item) => {
                      return <CartItem key={item._id} item={item} admin />;
                    })}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => setOrderEdit({ ...orderEdit, openModal: false })}
              >
                Close
              </Button>
              <Button onClick={handleOrderUpdate}>Save</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </AdminLayout>
  );
};

export default AdminOrder;
