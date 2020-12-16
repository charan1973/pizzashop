const AddOn = require("../../models/AddOn");

exports.createAddOn = async (req, res) => {
  const { addOnName, addOnType, addOnPrice, addOnAvailable } = req.body;

  if (!addOnName || !addOnType || addOnPrice === "")
    return res.json({ error: "All the fields are required" });

  if (!(addOnType === "topping" || addOnType === "addon"))
    return res.json({ error: "Add on type should be either topping or addon" });

  const newAddOn = new AddOn({
    addOnName,
    addOnType,
    addOnPrice,
    addOnAvailable,
    addOnCreator: req.user.id,
  });

  try {
    const savedAddOn = await newAddOn.save();
    return res.json({ message: `AddOn: '${savedAddOn.addOnName}' is added` });
  } catch (err) {
    return res.json({
      error:
        "Error saving addon. One the possibilities is that addon may already exists",
    });
  }
};

exports.updateAddOn = async (req, res) => {
  const { addOnId } = req.params;
  const { addOnName, addOnType, addOnPrice, addOnAvailable } = req.body;

  const findAddOn = await AddOn.findById(addOnId)
  if(!findAddOn) return res.json({error: "Cannot find the addon on the list"})

  if (addOnType && !(addOnType === "topping" || addOnType === "addon"))
    return res.json({ error: "Add on type should be either topping or addon" });

  try {
    const updatedAddOn = await AddOn.findByIdAndUpdate(addOnId, req.body);
    return res.json({ message: `'${updatedAddOn.addOnName}' addon is updated` });
  } catch (err) {
    return res.json({
      error:
        "Error could not update addon. Please check if all the fields are filled.",
    });
  }
};

exports.deleteAddOn = async (req, res) => {
    const {addOnId} = req.params

    const findAddOn = await AddOn.findById(addOnId)
    if(!findAddOn) return res.json({error: "AddOn not found to delete"})

    try{
        const deletedAddOn = await findAddOn.remove()
        return res.json({message: `'${deletedAddOn.addOnName}' addon is deleted`})
    }catch(err){
        return res.json({error: "Cannot delete specified addon"})
    }
}
