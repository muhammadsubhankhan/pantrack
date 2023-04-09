const Item = require('../models/item.model.js');

const createError = require('../utils/createError.js');

const createItem = async (req, res, next) => {
  const newItem = new Item(
    {
      item_name: req.body.item_name,
      item_description: req.body.item_description,
      item_quantity: req.body.item_quantity,
      dateAdded: req.body.dateAdded,
    },
  );
  try {
    const savedItem = await newItem.save();
    return res.status(200).json(savedItem);
  } catch (err) {
    return next(err);
  }
};

const deleteAllItems = async (req, res, next) => {
  try {
    await Item.deleteMany({});
    return res.json('All items deleted successfully');
  } catch (err) {
    return next(err);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.itemId);

    await Item.findByIdAndDelete(item);
    return res.json('Item deleted successfully');
  } catch (err) {
    return next(err);
  }
};

const getAllItems = async (req, res, next) => {
  try {
    const items = await Item.find({});
    return res.status(200).json(items);
  } catch (err) {
    return next(err);
  }
};

const getcurrentItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.itemId);

    return res.status(200).json(item);
  } catch (err) {
    return next(err);
  }
};

const updateItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.itemId).exec();
    if (!item) {
      return next(createError({ status: 404, message: ' item not found' }));
    }

    const updatedItem = await Item.findByIdAndUpdate(req.params.itemId, {

      item_name: req.body.item_name,
      item_description: req.body.item_description,
      item_quantity: req.body.item_quantity,
      dateAdded: req.body.dateAdded,

    }, { new: true });

    return res.status(200).json(updatedItem);
  } catch (error) {
    return next(error);
  }
};


module.exports = {
  updateItem, createItem, getAllItems, getcurrentItem, deleteAllItems, deleteItem
}