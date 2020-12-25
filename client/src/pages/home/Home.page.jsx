import { SearchIcon } from "@chakra-ui/icons";
import {
  Input,
  Button,
  Flex,
  Divider,
  Box,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { getAllCategory } from "../../components/admin-category-components/category-helper";
import ItemDirectory from "../../components/item-directory/ItemDirectory.component";
import ItemDrawer from "../../components/item-drawer/ItemDrawer.component";
import { ItemContext } from "../../context/item/ItemContext";
import { getAllItems } from "./home-helper";

const Home = () => {
  const { item } = useContext(ItemContext);
  const [itemData, setItemData] = useState({
    categories: [],
    items: [],
  });

  const getData = async () => {
    await getAllCategory().then(({ data }) => {
      if (data.category) {
        setItemData((prevState) => {
          return { ...prevState, categories: data.category };
        });
      }
    });
    await getAllItems().then(({ data }) => {
      if (data.item) {
        setItemData((prevState) => {
          return { ...prevState, items: data.item };
        });
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);


  const { items, categories } = itemData;

  return (
    <div>
      <Flex w="50%" mx="auto">
        <Input placeholder="Search Pizzas..." />
        <Button>
          <SearchIcon />
        </Button>
      </Flex>
      <div>
        {categories.map((category) => {
          return (
            <Box key={category._id} mt="30px">
              <Text as="h3" fontSize="30px">
                {category.categoryName}
              </Text>
              <Divider />
              <SimpleGrid mt="20px" columns={{ sm: 1, md: 2, lg: 3 }}>
                <ItemDirectory items={items} filterId={category._id} />
              </SimpleGrid>
            </Box>
          );
        })}
      </div>
      {item.showDrawer && <ItemDrawer />}
    </div>
  );
};

export default Home;
