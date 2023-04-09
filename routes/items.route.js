const express = require('express')
const router = express.Router()
const verifyJWT = require('../middleware/verifyJWT.js')
// const controller
const {
    createItem,
    deleteAllItems,
    deleteItem,
    getAllItems,
    getcurrentItem,
    updateItem,
} = require('../controllers/item.controller.js')

// router.get('/', function (req, res, next) {
//     res.json({ message: "Welcome to the item management subsystem api." });
// });

router.use(verifyJWT)

router.route('/').post(createItem).get(getAllItems).delete(deleteAllItems)

router.route('/:id').put(updateItem).get(getcurrentItem).delete(deleteItem)

// // Create a new item
// router.route().post('/items/', createItem);

// // Retrieve all items
// router.get('/items/', getAllItems);

// // Retrieve a single item with id
// router.get('/items/:id', getcurrentItem);

// // Update a item with id
// router.put('/items/:id', updateItem);

// // Delete a item with id
// router.delete('/items/:id', deleteItem);

// // Delete all items of the database
// router.delete('/items/', deleteAllItems);

module.exports = router
