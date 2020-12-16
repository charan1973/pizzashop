const Category = require("../../models/Category");

exports.createCategory = async (req, res) => {
  const { categoryName } = req.body;

  if (!categoryName)
    return res.json({ error: "Category Name cannot be empty" });

  const findCategory = await Category.findOne({ categoryName });
  if (findCategory) return res.json({ error: "Category already exists" });

  const newCategory = new Category({
    categoryName,
    categoryCreator: req.user.id,
  });

  try {
    const savedCategory = await newCategory.save();
    return res.json({
      message: `Category: '${savedCategory.categoryName}' created`,
    });
  } catch (err) {
    return res.json({
      error: "Category cannot be saved. Look if something is missing.",
    });
  }
};

exports.deleteCategory = async (req, res) => {
  const { categoryId } = req.params;

  const findCategory = await Category.findById(categoryId);
  if (!findCategory)
    return res.json({ error: "Unknown category specified to delete" });

  try {
    const deletedCategory = await findCategory.remove();
    res.json({ message: `Category '${deletedCategory.categoryName}' delete` });
  } catch (err) {
    res.json({ error: "Error deleting category" });
  }
};
