import { SearchIcon } from "@chakra-ui/icons";
import {
  Input,
  Button,
  Flex,
  Divider,
  Box,
  Image,
  Heading,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";

const Home = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  return (
    <div>
      <Flex w="50%" mx="auto">
        <Input placeholder="Search Pizzas..." />
        <Button>
          <SearchIcon />
        </Button>
      </Flex>
      <div>
        <div>
          <h3>VEG</h3>
          <Divider />
          <SimpleGrid mt="20px" columns={{ sm: 1, md: 2, lg: 3 }}>
            {arr.map((arr) => {
              return (
                <Box
                  key={arr}
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
                    src={
                      "https://9792366823.myzencommerce.in/userdata/public/gfx/155/new_double_cheese_margherita.jpg"
                    }
                    alt="alt"
                  />
                  <Box p="6">
                    <Box display="flex" flexDirection="column" py="10px">
                      <Heading
                        as="h5"
                        fontWeight="bold"
                        fontSize="20px"
                        py="20px"
                      >
                        Margerita
                      </Heading>
                      <Text>Starting @ ₹49</Text>
                      <Flex justifyContent="space-between">
                        <Button w="90%" _focus={{ outline: "none" }}>
                          ADD TO CART
                        </Button>
                        <Button
                          w="90%"
                          _focus={{ outline: "none" }}
                          color="white"
                          bg="blue.400"
                        >
                          CUSTOMIZE
                        </Button>
                      </Flex>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </SimpleGrid>
        </div>
      </div>
    </div>
  );
};

export default Home;
