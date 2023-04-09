const express = require('express')
const router = express.Router()
const verifyJWT = require('../middleware/verifyJWT.js')
// const controller
const {
    createMember,
    deleteAllMembers,
    deleteMember,
    getAllMembers,
    getcurrentMember,
    updateMember,
} = require('../controllers/member.controller.js')

// router.get('/', function (req, res, next) {
//     res.json({ message: "Welcome to the Member management subsystem api." });
// });

router.use(verifyJWT)

router.route('/').post(createMember).get(getAllMembers).delete(deleteAllMembers)
router
    .route('/:id')
    .put(updateMember)
    .get(getcurrentMember)
    .delete(deleteMember)

// // Create a n

// // Create a new member
// router.post('/members/', createMember);

// // Retrieve all members
// router.get('/members/', getAllMembers);

// // Retrieve a single member with id
// router.get('/members/:id', getcurrentMember);

// // Update a member with id
// router.patch('/members/:id', updateMember);

// // Delete a member with id
// router.delete('/members/:id', deleteMember);

// // Delete all members of the database
// router.delete('/members/', deleteAllMembers);

module.exports = router
