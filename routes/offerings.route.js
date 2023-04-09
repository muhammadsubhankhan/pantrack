const express = require('express')
const verifyJWT = require('../middleware/verifyJWT.js')

// Import controller
const {
    createOffering,
    deleteAllOfferings,
    deleteOffering,
    getAllOfferings,
    getcurrentOffering,
    updateOffering,
} = require('../controllers/offering.controller.js')

const router = express.Router()

// router.get('/', function (req, res, next) {
//     res.json({ message: "Welcome to the offering management subsystem api." });
// });

router
    .route('/')
    .post(createOffering)
    .get(getAllOfferings)
    .delete(deleteAllOfferings)

router
    .route('/:id')
    .put(updateOffering)
    .delete(deleteOffering)
    .get(getcurrentOffering)
// router.use(verifyJWT);
// // Create a new offering
// router.post('/offerings/', createOffering);

// // Retrieve all offerings
// router.get('/offerings/', getAllOfferings);

// // Retrieve a single offering with id
// router.get('/offerings/:id', getcurrentOffering);

// // Update a offering with id
// router.put('/offerings/:id', updateOffering);

// // Delete a offering with id
// router.delete('/offerings/:id', deleteOffering);

// // Delete all offerings of the database
// router.delete('/offerings/', deleteAllOfferings);

module.exports = router
