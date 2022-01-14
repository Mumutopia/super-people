##Super People

#Requirements
.For the database I use MongoDb and MongoDB Compass
.Server-side : "npm install" for  the server dependencies, and "npm run start" to start the server
.Client-side :  "npm install" for the client dependencies, and "npm run start" to start the client
.env : if you want to change the path of the database it's there : MONGO_URI : "yourpath"

#Change Parameters
.if you want to change the randomness of the number of users or connections : 
-users : ./functions/generateUsers.Js on lign 6 you can increase the number
-connections : ./functions/generateConnections.js  on lign 20 you need to change the number and on lign 32 :  maxUserConnections < "here".
