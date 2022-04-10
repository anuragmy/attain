const Restraunts = require("../models/Restraunts");

exports.getRestaunts = async (req, res) => {
  const response = await Restraunts.find({
    $or: [
      {
        "Restaurant Name": {
          $regex: req.query.keyword,
          $options: "i",
        },
      },
      {
        Cuisines: {
          $regex: req.query.keyword,
          $options: "i",
        },
      },
      {
        Locality: {
          $regex: req.query.keyword,
          $options: "i",
        },
      },
    ],
  }).limit(20);
  if (response) {
    return res.status(200).json({
      response,
      total: response.length,
      message: "success",
    });
  } else {
    return res.status(404).json({
      error: "Restraunts not found",
    });
  }
};

exports.getAllRestaunts = async (req, res) => {
  const response = await Restraunts.find().limit(20);
  if (response) {
    return res.status(200).json({
      response,
      total: response.length,
      message: "success",
    });
  } else {
    return res.status(404).json({
      error: "Restraunts not found",
    });
  }
};
