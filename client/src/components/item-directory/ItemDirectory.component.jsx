import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { showCustomizeDrawer } from "../../context/item/item.actions";
import { ItemContext } from "../../context/item/ItemContext";
import ItemCard from "../item-card/ItemCard.component";

const ItemDirectory = ({ items, filterCategoryId }) => {
    const {itemDispatch} = useContext(ItemContext)
    const history = useHistory()


    const customizeItem = (itemId) => {
      itemDispatch(showCustomizeDrawer())
      history.push(`/?item=${itemId}`)
    }

  return (
    <>
      {items
        .filter((item) => item.itemCategory._id === filterCategoryId)
        .map((item) => {
          return (
            <ItemCard key={item._id} item={item} customizeOnClick={() => customizeItem(item._id)}/>
          );
        })}
    </>
  );
};

export default ItemDirectory;
