const Item = require('../models/item.model.js')

const createError = require('../utils/createError.js')

const createItem = async (req, res, next) => {
    const newItem = new Item({
        item_name: req.body.item_name,
        item_description: req.body.item_description,
        item_quantity: req.body.item_quantity,
        dateAdded: req.body.dateAdded,
    })
    try {
        const data = await newItem.save()
        return res
            .status(200)
            .json({ message: 'Item has been Created Successfully', data })
    } catch (err) {
        return next(err)
    }
}

const deleteAllItems = async (req, res, next) => {
    try {
        await Item.deleteMany({})
        return res.json({ message: 'All items deleted successfully' })
    } catch (err) {
        return next(err)
    }
}

const deleteItem = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id)

        await Item.findByIdAndDelete(item)
        return res.json({ message: 'Item deleted successfully' })
    } catch (err) {
        return next(err)
    }
}

const getAllItems = async (req, res, next) => {
    try {
        const data = await Item.find({})
        return res.status(200).json({ message: 'success', data })
    } catch (err) {
        return next(err)
    }
}

const getcurrentItem = async (req, res, next) => {
    try {
        const data = await Item.findById(req.params.id)

        return res.status(200).json({ message: 'Success', data })
    } catch (err) {
        return next(err)
    }
}

const updateItem = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id).exec()
        if (!item) {
            return next(
                createError({ status: 404, message: ' item not found' })
            )
        }

        const data = await Item.findByIdAndUpdate(
            req.params.id,
            {
                item_name: req.body.item_name,
                item_description: req.body.item_description,
                item_quantity: req.body.item_quantity,
                dateAdded: req.body.dateAdded,
            },
            { new: true }
        )

        return res
            .status(200)
            .json({ message: 'Item has been updated successfully', data })
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    updateItem,
    createItem,
    getAllItems,
    getcurrentItem,
    deleteAllItems,
    deleteItem,
}
