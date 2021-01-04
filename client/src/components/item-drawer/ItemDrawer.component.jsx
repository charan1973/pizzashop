import { AddIcon, ArrowForwardIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  Radio,
  RadioGroup,
  SimpleGrid,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { v4 as uuidv4 } from "uuid";
import {
  addToCartAction,
  closeCustomizeDrawer,
} from "../../context/item/item.actions";

import { ItemContext } from "../../context/item/ItemContext";
import { getAllAddOn, getItem } from "../../pages/home/home.helper";
import Head from "../head/Head.component";

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
      <Box>{children}</Box>
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
  const toast = useToast();
  const [itemState, setItemState] = useState({
    itemData: null,
    addOnData: [],
    isLoaded: false,
  });
  const [cartItem, setCartItem] = useStateWithCallbackLazy({
    id: "",
    itemName: "",
    itemSize: "",
    itemId: "",
    itemPrice: null,
    addOn: [],
    quantity: 1,
  });

  const { itemData, addOnData, isLoaded } = itemState;
  const { quantity } = cartItem;

  const getData = async () => {
    await getItem(query.get("item")).then(({ data }) => {
      setItemState((prevState) => ({
        ...prevState,
        itemData: data.item,
      }));
    });
    await getAllAddOn().then(({ data }) => {
      setItemState((prevState) => ({
        ...prevState,
        addOnData: data.addon,
        isLoaded: true,
      }));
    });
  };

  useEffect(() => {
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const quantityManage = (type) => {
    if (type === "increase") {
      if (quantity === 10) return "";
      setCartItem({ ...cartItem, quantity: quantity + 1 });
    } else if (type === "decrease") {
      if (quantity === 1) return "";
      setCartItem({ ...cartItem, quantity: quantity - 1 });
    }
  };

  const handleAddToCart = () => {
    if (!cartItem.itemSize) {
      toast({
        title: "Error",
        description: "Choose a size",
        status: "error",
        duration: 1300,
      });
      return "";
    }

    setCartItem(
      {
        ...cartItem,
        itemName: itemData.itemName,
        itemId: itemData._id,
        addOn: addOnData.filter((addOn) => cartItem.addOn.includes(addOn._id)),
        id: uuidv4(),
      },
      (currentCartItem) => {
        itemDispatch(addToCartAction(currentCartItem));
        itemDispatch(closeCustomizeDrawer());
        toast({
          title: "Add Cart",
          description: "Item added to cart",
          status: "success",
        });
      }
    );
  };

  return (
    <>
      <Drawer
        placement="left"
        onClose={() => itemDispatch(closeCustomizeDrawer())}
        isOpen={item.showDrawer}
        size="md"
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Customize Item</DrawerHeader>
            <DrawerBody>
              {isLoaded ? (
                <>
                  <Head title={`Customise ${itemData.itemName}`} />
                  <Image
                    src={itemData.image.url}
                    alt="item"
                    h="250px"
                    m="0 auto"
                  />
                  <Section sectionName="Item">{itemData.itemName}</Section>
                  <Section sectionName="Category">
                    {itemData.itemCategory.categoryName}
                  </Section>
                  <Section sectionName="Select Size">
                    <RadioGroup
                      onChange={(value) =>
                        setCartItem({
                          ...cartItem,
                          itemSize: value,
                          itemPrice: itemData.size[value],
                        })
                      }
                    >
                      <SimpleGrid columns={3} spacing={2}>
                        <BorderBox>
                          <Radio value="regular">Regular</Radio>
                          <p>{itemData.size.regular}</p>
                        </BorderBox>
                        <BorderBox>
                          <Radio value="medium">Medium</Radio>
                          <p>{itemData.size.medium}</p>
                        </BorderBox>
                        <BorderBox>
                          <Radio value="large">Large</Radio>
                          <p>{itemData.size.large}</p>
                        </BorderBox>
                      </SimpleGrid>
                    </RadioGroup>
                  </Section>
                  <CheckboxGroup
                    onChange={(value) =>
                      setCartItem({ ...cartItem, addOn: [...value] })
                    }
                  >
                    <Section sectionName="Toppings">
                      <SimpleGrid columns={3} spacing={2}>
                        {addOnData
                          .filter((addOn) => addOn.addOnType === "topping")
                          .map((addOn) => {
                            return (
                              <BorderBox key={addOn._id}>
                                <Checkbox
                                  value={addOn._id}
                                  isDisabled={!addOn.addOnAvailable}
                                >
                                  {addOn.addOnName}
                                </Checkbox>
                                {addOn.addOnAvailable ? (
                                  <p>{addOn.addOnPrice}</p>
                                ) : (
                                  <p>NA</p>
                                )}
                              </BorderBox>
                            );
                          })}
                      </SimpleGrid>
                    </Section>
                    <Section sectionName="Add On">
                      <SimpleGrid columns={3} spacing={2}>
                        {addOnData
                          .filter((addOn) => addOn.addOnType === "addon")
                          .map((addOn) => {
                            return (
                              <BorderBox key={addOn._id}>
                                <Checkbox
                                  value={addOn._id}
                                  isDisabled={!addOn.addOnAvailable}
                                >
                                  {addOn.addOnName}
                                </Checkbox>
                                {addOn.addOnAvailable ? (
                                  <p>{addOn.addOnPrice}</p>
                                ) : (
                                  <p>NA</p>
                                )}
                              </BorderBox>
                            );
                          })}
                      </SimpleGrid>
                    </Section>
                  </CheckboxGroup>
                  <Section sectionName="Quantity">
                    <Flex>
                      <IconButton
                        icon={<AddIcon />}
                        onClick={() => quantityManage("increase")}
                      />
                      <Button isDisabled>{quantity}</Button>
                      <IconButton
                        icon={<MinusIcon />}
                        onClick={() => quantityManage("decrease")}
                      />
                    </Flex>
                  </Section>
                  <Flex justifyContent="space-between" mb="10px">
                    <Button
                      _focus={{ outline: "none" }}
                      bg="gray.600"
                      onClick={() => itemDispatch(closeCustomizeDrawer())}
                    >
                      CANCEL
                    </Button>
                    <Button
                      _focus={{ outline: "none" }}
                      bg="gray.900"
                      color="white"
                      onClick={handleAddToCart}
                    >
                      ADD TO CART
                      <ArrowForwardIcon />
                    </Button>
                  </Flex>
                </>
              ) : (
                <Box
                  d="flex"
                  justifyContent="center"
                  alignItems="center"
                  h="100%"
                >
                  <Spinner size="xl" />
                </Box>
              )}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default ItemDrawer;
