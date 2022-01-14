require("../config/mongo.js");
const userModel = require("../models/Users");
const { names, lastNames } = require("../javascripts/nameList.js");

module.exports = function generateUsers(req, res, next) {
  const userCount = Math.floor(Math.random() * 500) + 1;

  // const usersSeed = [{}]

  // for (let i = 1; i < 1000; i++) {
  // const randomName = names[Math.floor(Math.random()*(names.length-1))]
  // const randomLastName = names[Math.floor(Math.random()*(lastNames.length-1))]

  // const randomUser = {
  //     name: randomName,
  //     familyName : randomLastName,
  //     }

  //     usersSeed.push(randomUser)
  // }

  //trying to optimize the code to run faster

  let randomName;
  let randomLastName;
  let colorChoice = ["Red", "Green", "Blue"];

  const usersSeed = [];

  for (let i = 1; i <= userCount; i++) {
    randomName = names[Math.floor(Math.random() * names.length)];
    randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    randomColor = colorChoice[Math.floor(Math.random() * colorChoice.length)];

    const randomUser = {
      name: randomName,
      lastName: randomLastName,
      favColor: randomColor,
    };

    usersSeed[i - 1] = randomUser;
  }

  //Deletes the user DB and create a new one
  userModel
    .deleteMany()
    .then(() => {
      userModel.create(usersSeed).then(() => {
        console.log("users have been created");
        next();
      });
    })
    .catch((err) => console.log("err", err));
};
