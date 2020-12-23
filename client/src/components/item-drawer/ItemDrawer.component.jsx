import {
  Box,
  Checkbox,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Image,
  Radio,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ItemContext } from "../../context/item/ItemContext";
import { CLOSE_DRAWER } from "../../context/item/itemTypes";
import { getAllAddOn, getItem } from "../../pages/home/home-helper";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Section = ({ sectionName, children }) => {
  return (
    <Box my="15px">
      <Text as="p" fontSize="15px" color="gray.400">
        {sectionName}
      </Text>
      <Divider />
      {!Array.isArray(children) ? (
        <Text as="p" fontSize="25px">
          {children}
        </Text>
      ) : (
        <Box>{children}</Box>
      )}
    </Box>
  );
};

const BorderBox = ({ children }) => {
  return (
    <Box p="10px" border="0.1px #A0AEC0 solid" borderRadius="3px">
      {children}
    </Box>
  );
};

const ItemDrawer = () => {
  const { item, itemDispatch } = useContext(ItemContext);
  const query = useQuery();
  const [itemState, setItemState] = useState({
    itemData: null,
    addOnData: [],
    isLoaded: false,
  });

  useEffect(() => console.log(itemState), [itemState]);
  
  const { itemData, addOnData, isLoaded } = itemState;

  const getData = async () => {
    await getItem(query.get("item")).then(({ data }) => {
      setItemState((prevState) => {
        return {
          ...prevState,
          itemData: data.item
        }
      })
    });
    await getAllAddOn().then(({ data }) => {
      setItemState((prevState) => {
        return {
          ...prevState,
          addOnData: data.addon,
          isLoaded: true
        }
      })
    });
  };

  useEffect(() => {
    getData();
  }, []);


  return (
    isLoaded && (
      <Drawer
        placement="left"
        onClose={() => itemDispatch({ type: CLOSE_DRAWER })}
        isOpen={item.showDrawer}
        size="md"
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
            <DrawerBody>
              <Image src={itemData.image.url} alt="item" h="250px" m="0 auto" />
              <Section sectionName="Item">{itemData.itemName}</Section>
              <Section sectionName="Category">
                {itemData.itemCategory.categoryName}
              </Section>
              <Section sectionName="Select Size">
                <SimpleGrid columns={3} spacing={2}>
                  <BorderBox>
                    <Radio>Regular</Radio>
                    <p>{itemData.size.regular}</p>
                  </BorderBox>
                  <BorderBox>
                    <Radio>Medium</Radio>
                    <p>{itemData.size.medium}</p>
                  </BorderBox>
                  <BorderBox>
                    <Radio>Large</Radio>
                    <p>{itemData.size.large}</p>
                  </BorderBox>
                </SimpleGrid>
              </Section>
              <Section sectionName="Toppings">
                <SimpleGrid columns={3} spacing={2}>
                  {addOnData.filter(addOn => addOn.addOnType === "topping").map((addOn) => {
                    return (
                      <BorderBox>
                        <Checkbox>{addOn.addOnName}</Checkbox>
                        <p>{addOn.addOnPrice}</p>
                      </BorderBox>
                    );
                  })}
                </SimpleGrid>
              </Section>
              <Section sectionName="Add On">
              <SimpleGrid columns={3} spacing={2}>
                  {addOnData.filter(addOn => addOn.addOnType === "addon").map((addOn) => {
                    return (
                      <BorderBox>
                        <Checkbox>{addOn.addOnName}</Checkbox>
                        <p>{addOn.addOnPrice}</p>
                      </BorderBox>
                    );
                  })}
                </SimpleGrid>
              </Section>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    )
  );
};

export default ItemDrawer;
