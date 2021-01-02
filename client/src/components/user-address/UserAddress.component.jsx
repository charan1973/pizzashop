import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

const UserAddress = ({
  addressModal,
  handleAddressChange,
  handleOpenModal,
  handleAddressSave,
}) => {
  return (
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
  );
};

export default UserAddress;
