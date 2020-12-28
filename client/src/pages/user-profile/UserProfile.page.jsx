import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
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
import { useContext, useEffect, useState } from "react";
import AddressPreview from "../../components/address-preview/AddressPreview.component";
import { UserContext } from "../../context/user/UserContext";
import { addressWrite, deleteAddress, getUserData } from "./user.helper";

const UserProfile = () => {
  const toast = useToast();
  const [userData, setUserData] = useState({ loaded: false });
  const { user } = useContext(UserContext);
  const [addressModal, setAddressModal] = useState({
    buildingNumber: "",
    streetName: "",
    area: "",
    city: "",
    zipcode: "",
    phoneNumber: null,
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

  useEffect(() => {
    getUserData(user.id).then(({ data }) => {
      if (data.user) {
        setUserData({ ...data.user, loaded: true });
      }
    });
  }, [reload]);

  useEffect(() => console.log(addressModal), [addressModal]);

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
      <Container>
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
                        <Box>
                          <Flex justifyContent="space-between">
                            <Box key={_id}>
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

        <Modal isOpen={addressModal.openModal} onClose={handleOpenModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{addressModal.type} Address</ModalHeader>
            <ModalBody pb={6}>
              <Input
                placeholder="Building Number"
                name="buildingNumber"
                type="text"
                onChange={handleAddressChange}
                mb={2}
                value={addressModal.buildingNumber}
              />
              <Input
                placeholder="Street Name"
                name="streetName"
                type="text"
                onChange={handleAddressChange}
                mb={2}
                value={addressModal.streetName}
              />
              <Input
                placeholder="Area"
                name="area"
                type="text"
                onChange={handleAddressChange}
                mb={2}
                value={addressModal.area}
              />
              <Input
                placeholder="City"
                name="city"
                type="text"
                onChange={handleAddressChange}
                mb={2}
                value={addressModal.city}
              />
              <Input
                placeholder="Zipcode"
                name="zipcode"
                type="number"
                onChange={handleAddressChange}
                mb={2}
                value={addressModal.zipcode}
              />
              <Input
                placeholder="Phone Number"
                name="phoneNumber"
                type="number"
                onChange={handleAddressChange}
                value={addressModal.phoneNumber}
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleAddressSave}>
                Save
              </Button>
              <Button onClick={handleOpenModal}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
    )
  );
};

export default UserProfile;
