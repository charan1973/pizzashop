import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
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
import { useEffect, useState } from "react";
import AddressPreview from "../../components/address-preview/AddressPreview.component";
import UserAddress from "../../components/user-address/UserAddress.component";
import { addressWrite, deleteAddress, getUserData } from "./user.helper";

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

  useEffect(() => {
    getUserData().then(({ data }) => {
      if (data.user) {
        setUserData({ ...data.user, loaded: true });
      }
    });
  }, [reload]);

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
        {/* Show orders */}
        <Accordion allowToggle>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Show Orders
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

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
