const Category = require("../models/Category")
const Item = require("../models/Item")
const AddOn = require("../models/AddOn")

exports.getAllCategory = async (req, res) => {
    try {
        const allCategories = await Category.find({})
        return res.json({category: allCategories})
    } catch (error) {
        return res.json({error: "Cannot fulfill the request"})
    }
}

exports.getAllItem = async (req, res) => {
    try {
        const allItems = await Item.find({}).populate("itemCategory")
        return res.json({item: allItems})
    } catch (error) {
        return res.json({error: "Cannot fulfill the request"})
    }
}

exports.getSingleItem = async (req, res) => {
    const itemId = req.params.itemId
    try{
        const item = await Item.findById(itemId).populate("itemCategory")
        return res.json({item})
    }catch(err){
        return res.json({error: "Cannot fulfill the request"})
    }
}

exports.getAllAddOn = async (req, res) => {
    try {
        const allAddOn = await AddOn.find({})
        return res.json({addon: allAddOn})
    } catch (error) {
        return res.json({error: "Cannot fulfill the request"})
    }
}