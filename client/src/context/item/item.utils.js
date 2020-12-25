export const deleteItemFromCart = (cart, itemId) => {
  return cart.filter((item) => item.id !== itemId);
};

export const increaseDecreaseItemQuantity = (cart, itemId, quantityState) => {
  const item = cart.find((item) => item.id === itemId);
  if (quantityState === "increase") {
    item.quantity = item.quantity !== 10 ? item.quantity + 1 : item.quantity;
} else if (quantityState === "decrease") {
    item.quantity = item.quantity !== 1  ? item.quantity - 1 : item.quantity;
  }
  return [
      ...cart
  ]
};
