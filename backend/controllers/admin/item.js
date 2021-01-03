const Item = require("../../models/Item");
const uploader = require("../../config/cloudinaryConfig")

exports.createItem = async (req, res) => {
  const { itemName, size, itemCategory } = req.body;
  let image = ""

  if(req.file !== undefined){
    const { url, secure_url, public_id, asset_id } = await uploader.upload(
      req.file.path, {folder: "pizza/"}
    );
    image = {
      url,
      secure_url,
      public_id,
      asset_id,
    };
  }

  if (!itemName || Object.keys(JSON.parse(size)).length === 0 || !itemCategory)
    return res.json({ error: "All the fields are required" });

  const newItem = new Item({
    ...req.body,
    itemCreator: req.user.id,
    size: JSON.parse(size),
    image
  });
  try {
    const savedItem = await newItem.save();
    return res.json({ message: `Item: '${savedItem.itemName}' saved` });
  } catch (err) {
    res.json({ error: "Error saving item." });
  }
};

exports.updateItem = async (req, res) => {
  const { itemId } = req.params;

  const findItem = await Item.findById(itemId);
  if (!findItem) return res.json({ error: "No items found on the list" });

  // Delete Image property so that it doesn't affect the existing image
  if(req.body.image){
    delete req.body.image
  }

  if (req.body.size) {
    findItem.size = {
      ...findItem.size,
      ...req.body.size,
    };
    await findItem.save();
    delete req.body.size;
  }

  try {
    const updatedItem = await Item.findByIdAndUpdate(itemId, req.body);
    return res.json({ message: `Item: '${updatedItem.itemName}' is updated` });
  } catch (err) {
    return res.json({ error: "Error updating the item." });
  }
};

exports.deleteItem = async (req, res) => {
  const { itemId } = req.params;

  const findItem = await Item.findById(itemId);
  if (!findItem) return res.json({ error: "No items found on the list" });

  try {
    const deleteImage = await uploader.destroy(findItem.image.public_id)
    const deletedItem = await findItem.remove();
    return res.json({ message: `Item: '${deletedItem.itemName}' deleted` });
  } catch (err) {
    return res.json({ error: "Error deleting item" });
  }
};
