const Event = require("../models/event.model.js");

const createError = require("../utils/createError.js");

const createEvent = async (req, res, next) => {
  const newEvent = new Event({
    event_name: req.body.event_name,
    attendees: req.body.attendees,
    offering_name: req.body.offering_name,
    event_description: req.body.event_description,
    special_guests: req.body.special_guests,
    guests: req.body.guests,
    eventDate: req.body.eventDate,
    eventTime: req.body.eventTime,
  });
  try {
    const data = await newEvent.save();
    return res.status(200).json({
      message: "Event has been created successfully",
      data,
    });
  } catch (err) {
    return next(err);
  }
};

const deleteAllEvents = async (req, res, next) => {
  try {
    await Event.deleteMany({});
    return res.json({ message: "All Events deleted successfully" });
  } catch (err) {
    return next(err);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    await Event.findByIdAndDelete(event);
    return res.json({ message: "Event deleted successfully" });
  } catch (err) {
    return next(err);
  }
};

const getAllEvents = async (req, res, next) => {
  try {
    const data = await Event.find({});
    return res.status(200).json({ message: "Success", data });
  } catch (err) {
    return next(err);
  }
};

const getcurrentEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    return res.status(200).json(event);
  } catch (err) {
    return next(err);
  }
};

const updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).exec();
    if (!event) {
      return next(createError({ status: 404, message: " Event not found" }));
    }

    const data = await Event.findByIdAndUpdate(
      req.params.id,
      {
        event_name: req.body.event_name,
        attendees: req.body.attendees,
        offering_name: req.body.offering_name,
        event_description: req.body.event_description,
        special_guests: req.body.special_guests,
        guests: req.body.guests,
        eventDate: req.body.eventDate,
        eventTime: req.body.eventTime,
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Event has been updated successfully", data });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllEvents,
  getcurrentEvent,
  deleteAllEvents,
  deleteEvent,
  createEvent,
  updateEvent,
};
