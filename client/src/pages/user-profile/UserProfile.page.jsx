import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  useToast,
} from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState } from "react";
import AddressPreview from "../../components/address-preview/AddressPreview.component";
import Head from "../../components/head/Head.component";
import UserAddress from "../../components/user-address/UserAddress.component";
import {
  addressWrite,
  deleteAddress,
  getUserData,
  getUserOrders,
} from "./user.helper";

const UserProfile = () => {
  const toast = useToast();
  const [userData, setUserData] = useState({ loaded: false });
  const [addressModal, setAddressModal] = useState({
    buildingNumber: "",
    streetName: "",
    area: "",
    city: "",
    zipcode: "",
    phoneNumber: "",
    openModal: false,
    addressId: "",
    type: "",
  });

  const [reload, setReload] = useState(false);

  const handleOpenModal = () =>
    setAddressModal({
      openModal: !addressModal.openModal,
      buildingNumber: "",
      streetName: "",
      area: "",
      city: "",
      zipcode: "",
      phoneNumber: "",
      addressId: "",
      type: "",
    });

  const [orders, setOrders] = useState({
    order: [],
    page: 1,
  });

  useEffect(() => {
    getUserData().then(({ data }) => {
      if (data.user) {
        setUserData({ ...data.user, loaded: true });
      }
    });
  }, [reload]);

  useEffect(() => {
    getUserOrders(orders.page).then(({ data }) =>
      setOrders({ ...orders, order: data.order })
    ); // eslint-disable-next-line
  }, [orders.page]);

  const { firstName, lastName, email, fullName, address, loaded } = userData;

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressModal({ ...addressModal, [name]: value });
  };

  const handleAddressSave = () => {
    addressWrite(addressModal).then(({ data }) => {
      if (data.message) {
        toast({
          title: "Success",
          description: data.message,
          status: "success",
        });
        setAddressModal({ ...addressModal, openModal: false });
        setReload(!reload);
      }
    });
  };

  const handleAddressDelete = (addressId) => {
    deleteAddress(addressId).then(({ data }) => {
      if (data.message) {
        toast({
          title: "Success",
          description: data.message,
          status: "success",
        });
        setReload(!reload);
      }
    });
  };

  return (
    loaded && (
      <Container maxW="500px" d="flex" flexDirection="column" alignItems="center" mb="20px">
      <Head title={fullName} />
        <Text as="h2" fontSize="30px">
          Profile: {fullName}
        </Text>
        <Divider />
        <Table>
          <Tbody>
            <Tr>
              <Td>First Name</Td>
              <Td>{firstName}</Td>
            </Tr>
            <Tr>
              <Td>Last Name</Td>
              <Td>{lastName}</Td>
            </Tr>
            <Tr>
              <Td>Email</Td>
              <Td>{email}</Td>
            </Tr>
            <Tr>
              <Td>Address</Td>
              <Td d="flex" justifyContent="space-between">
                <Popover>
                  <PopoverTrigger>
                    <Button>Show All Address</Button>
                  </PopoverTrigger>
                  <PopoverContent py={3} h="170px" w="400px" overflow="scroll">
                    <PopoverBody>
                      {address.map(({ address, _id }) => (
                        <Box key={_id}>
                          <Flex justifyContent="space-between">
                            <Box>
                              <AddressPreview address={address} />
                            </Box>
                            <Flex>
                              <Button
                                mr="5px"
                                onClick={() =>
                                  setAddressModal({
                                    ...address,
                                    addressId: _id,
                                    type: "Update",
                                    openModal: true,
                                  })
                                }
                              >
                                <EditIcon />
                              </Button>
                              <Button onClick={() => handleAddressDelete(_id)}>
                                <DeleteIcon />
                              </Button>
                            </Flex>
                          </Flex>
                          <Divider />
                        </Box>
                      ))}
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
                <Button
                  ml="10px"
                  onClick={() =>
                    setAddressModal({
                      ...addressModal,
                      openModal: true,
                      type: "Create",
                    })
                  }
                >
                  <AddIcon />
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>

        <Box mt="10px">
          <Text as="h4" fontSize="26px" textAlign="center">
            Orders
          </Text>
          {orders.order.map((order) => (
            <Flex
              key={order._id}
              borderWidth="1px"
              borderRadius="lg"
              justifyContent="space-between"
              p="10px"
              mb="10px"
            >
              <Box>
                <Text as="p" color="gray.500" fontSize="xs">
                  {moment(order.createdAt).fromNow()}
                </Text>
                <Text as="p" color="gray.500">
                  Order Id: {order._id}
                </Text>
                <Text as="p">Total: {order.orderPrice}</Text>
              </Box>
              <Box>
                <Text
                  as="span"
                  color={
                    order.orderStatus === "cancelled" ? "red.300" : "green.400"
                  }
                >
                  {order.orderStatus}
                </Text>
              </Box>
            </Flex>
          ))}
          <Button
            onClick={() =>
              setOrders({
                ...orders,
                page: orders.page <= 4 ? orders.page + 1 : orders.page,
              })
            }
            w="100%"
            disabled={orders.page === 5}
          >
            {orders.page === 5 ? "THE END" : "Show More"}
          </Button>
        </Box>

        {/* Edit or create user address */}
        <UserAddress
          addressModal={addressModal}
          handleOpenModal={handleOpenModal}
          handleAddressChange={handleAddressChange}
          handleAddressSave={handleAddressSave}
        />
      </Container>
    )
  );
};

export default UserProfile;
