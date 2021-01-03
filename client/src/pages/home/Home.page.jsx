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
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { getAllCategory } from "../../components/admin-category/category.helper";
import Head from "../../components/head/Head.component";
import ItemDirectory from "../../components/item-directory/ItemDirectory.component";
import ItemDrawer from "../../components/item-drawer/ItemDrawer.component";
import { ItemContext } from "../../context/item/ItemContext";
import { getAllItems } from "./home.helper";

const Home = () => {
  const { item } = useContext(ItemContext);
  const [itemData, setItemData] = useState({
    categories: [],
    items: [],
  });

  const [search, setSearch] = useStateWithCallbackLazy({
    searchInput: "",
    filteredSearchItems: []
  })

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
  const {searchInput, filteredSearchItems} = search

  const handleSearchChange = (e) => {
    const {value} = e.target
    setSearch({
      ...search,
      searchInput: value,
      filteredSearchItems: items.filter(item => item.itemName.toLowerCase().includes(searchInput.toLowerCase()))
    })
  }

  return (
    <Box>
      <Head title="Home" />
      <Flex w="50%" mx="auto">
        <Input placeholder="Search Items..." name="searchInput" value={searchInput} onChange={handleSearchChange} />
        <Button>
          <SearchIcon />
        </Button>
      </Flex>
      <Box>
        {categories.map((category) => {
          return (
            <Box key={category._id} mt="30px">
              <Text as="h3" fontSize="30px">
                {category.categoryName}
              </Text>
              <Divider />
              <SimpleGrid mt="20px" columns={{ sm: 1, md: 2, lg: 3 }}>
                <ItemDirectory items={searchInput ? filteredSearchItems : items} filterCategoryId={category._id} />
              </SimpleGrid>
            </Box>
          );
        })}
      </Box>
      {item.showDrawer && <ItemDrawer />}
    </Box>
  );
};

export default Home;
