require("../config/mongo.js");
const userModel = require("../models/Users");
const connectionModel = require("../models/connections");

module.exports = async function generateConnections(req, res, next) {
  //   try {
  //     await connectionModel.create({
  //       userA: "61e048dd29f08a1abd2c2e8c",
  //       userB: "61e048dd29f08a1abd2c2e8d",
  //     });
  //     console.log("connection has been created");
  //     next();
  //   } catch (error) {
  //     console.error(error);
  //   }
  await connectionModel.deleteMany();
  const users = await userModel.find();

  users.forEach(async (user) => {
    let randomConnectionsCount = Math.floor(Math.random() * 5);

    //get an array of all the connections the user already have
    const userConnections = await connectionModel.find({
      $or: [{ userA: user._id }, { userB: user._id }],
    });

    //check how many connections the user already have
    let maxUserConnections = userConnections.length;

    for (
      let i = 0;
      i <= randomConnectionsCount && maxUserConnections < 5;
      i++, maxUserConnections++
    ) {
      let selectRandomUser = Math.floor(Math.random() * users.length);
      try {
        await connectionModel.create({
          userA: user._id,
          userB: users[selectRandomUser]._id,
        });
      } catch (error) {
        console.error(error);
      }
    }
  });
  console.log("connections have been created")
  next();
};
