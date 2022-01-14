require ('../config/mongo.js')
const userModel = require("../models/users")

const usersSeed=  [
    {
        name : 'john',
        favColor : "blue"
    },
    {
        name : 'johnnnn',
        favColor : "green"
    },
    {
        name : 'johnn',
        favColor : "red"
    },
    {
        name : 'johnnnnnnn',
        favColor : "blue"
    },
]

userModel
  .deleteMany()
  .then(() => {
    userModel.create(usersSeed).then(() => {
      console.log("users have been created");
      process.exit();
    });
  })
  .catch((err) => console.log("err", err));