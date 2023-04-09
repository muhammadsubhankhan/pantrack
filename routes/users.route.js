const express = require('express');
const verifyJWT = require('../middleware/verifyJWT.js');
const router = express.Router();
// Require controller
const { updateUser, getUserInfo } = require('../controllers/user.controller.js');


router.use(verifyJWT);

// Retrieve a single user with id

router.route('/')
    .get(getUserInfo)

    .put(updateUser)


// router.get('/users/:id', getUserInfo);

// // Update a user with id
// router.put('/users/:id', );

module.exports = router;
