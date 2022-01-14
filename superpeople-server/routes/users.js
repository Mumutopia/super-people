const express = require("express");
const router = express.Router();
const userModel = require("../models/Users");
const connectionModel = require("../models/connections");
const generateUsers = require("../functions/generateUsers"); //generates random users
const generateConnections = require("../functions/generateConnections");

/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
    const users = await userModel.find();
    const connections = await connectionModel
      .find()
      .populate("userA")
      .populate("userB");

    res.status(200).json({ users, connections });
  } catch (error) {
    console.error(error);
  }
});

/*
I used those 2 routes to get and test the connection before fetching it
*/

// router.get("/testconnection",generateConnections, (req,res,next) =>{
// console.log("done")
// res.status(200)
// } )

// router.get("/getconnections", async (req,res,next) => {
//   try {
//     const connections = await connectionModel.find().populate("userA").populate("userB")
//     res.status(200).json(connections)
//   } catch (error) {
//     console.error(error)
//   }
// })

/* Erase and create a new users list and connections */
router.get(
  "/testdata",
  generateUsers,
  generateConnections,
  async (req, res, next) => {
    try {
      const users = await userModel.find();
      const connections = await connectionModel
        .find()
        .populate("userA")
        .populate("userB");

      res.status(200).json({ users, connections });
    } catch (error) {
      console.error(error);
    }
  }
);

/*Get specific user data based on its id*/
router.get("/:id", async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
  }
});

/*update user's color*/
router.post("/:id", async (req, res, next) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
