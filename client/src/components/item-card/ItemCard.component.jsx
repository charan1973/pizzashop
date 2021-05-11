import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";

const ItemCard = ({item, customizeOnClick}) => {
    return ( 
        <Box
              key={item._id}
              my="10px"
              maxW="sm"
              borderWidth="1px"
              borderRadius="5px"
              overflow="hidden"
              boxShadow="2xl"
            >
              <Image
                height="250px"
                width="100%"
                src={item.image.secure_url}
                alt="alt"
              />
              <Box p="6">
                <Box display="flex" flexDirection="column" py="10px">
                  <Heading as="h5" fontWeight="bold" fontSize="20px" py="20px">
                    {item.itemName}
                  </Heading>
                  <Text>Starting @ ₹{item.size.regular}</Text>
                  {
                    item.itemAvailable ? 
                  (
                    <Button
                      _focus={{ outline: "none" }}
                      color="white"
                      bg="blue.400"
                      onClick={customizeOnClick}
                    >
                      ADD TO CART
                    </Button>
              )
                  :(
                    <Button isDisabled>Item Unavailable</Button>
                  )
                  }
                </Box>
              </Box>
            </Box>
     );
}
 
export default ItemCard;