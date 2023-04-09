const Offering = require("../models/offering.model.js");

const createError = require("../utils/createError.js");

const createOffering = async (req, res, next) => {
  const newOffering = new Offering({
    offering_name: req.body.offering_name,
    N_and_C: req.body.N_and_C,
    Amount: req.body.Amount,
    dateAdded: req.body.dateAdded,
  });
  try {
    const data = await newOffering.save();
    return res
      .status(200)
      .json({ message: "Offer has been created succussfully", data });
  } catch (err) {
    return next(err);
  }
};

const deleteAllOfferings = async (req, res, next) => {
  try {
    await Offering.deleteMany({});
    return res.json({ message: "All Offerings deleted successfully" });
  } catch (err) {
    return next(err);
  }
};

const deleteOffering = async (req, res, next) => {
  try {
    const offering = await Offering.findById(req.params.OfferingId);

    await Offering.findByIdAndDelete(offering);
    return res.json({ message: "Offering has been deleted successfully" });
  } catch (err) {
    return next(err);
  }
};

const getAllOfferings = async (req, res, next) => {
  try {
    const data = await Offering.find({});
    return res.status(200).json({ message: "Success.", data });
  } catch (err) {
    return next(err);
  }
};

const getcurrentOffering = async (req, res, next) => {
  try {
    const data = await Offering.findById(req.params.id);

    return res.status(200).json({ message: "success ", data });
  } catch (err) {
    return next(err);
  }
};

const updateOffering = async (req, res, next) => {
  try {
    const offering = await Offering.findById(req.params.id).exec();
    if (!offering) {
      return next(createError({ status: 404, message: " Offering not found" }));
    }

    const data = await Offering.findByIdAndUpdate(
      req.params.id,
      {
        offering_name: req.body.offering_name,
        N_and_C: req.body.N_and_C,
        Amount: req.body.Amount,
        dateAdded: req.body.dateAdded,
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Offering has been update successfully", data });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllOfferings,
  getcurrentOffering,
  createOffering,
  updateOffering,
  deleteAllOfferings,
  deleteOffering,
};
