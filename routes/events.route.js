const express = require('express')
const verifyJWT = require('../middleware/verifyJWT.js')
const router = express.Router()
// const controller
const {
    createEvent,
    deleteAllEvents,
    deleteEvent,
    getAllEvents,
    getcurrentEvent,
    updateEvent,
} = require('../controllers/event.controller.js')

// router.get('/', function (req, res, next) {
//     res.json({ message: "Welcome to the event management subsystem api." });
// });

router.route('/').post(createEvent).get(getAllEvents).delete(deleteAllEvents)

router.route('/:id').put(updateEvent).delete(deleteEvent).get(getcurrentEvent)
// router.use(verifyJWT);
// // Create a new event
// router.post('/events/', createEvent);

// // Retrieve all events
// router.get('/events/', getAllEvents);

// // Retrieve a single event with id
// router.get('/events/:id', getcurrentEvent);

// // Update a event with id
// router.put('/events/:id', updateEvent);

// // Delete a event with id
// router.delete('/events/:id', deleteEvent);

// // Delete all events of the database
// router.delete('/events/', deleteAllEvents);

module.exports = router
