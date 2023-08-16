const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const credentials = require('./sample-irf-firebase-adminsdk-go66e-ab6a485b45.json');
// const userRouter = require('./routes/userRoutes');
// const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const twilio = require('twilio');
// const userRouter = require('./routes/userRoutes');



const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users",userRouter);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const accountSid = "AC9d52d616166e69a9aad5bd77a996d90d";
const authToken = "d376b6bf0a102b224f6a00808ce289df";
const verifySid = "VA84bc2664455077e59e5242641e1b57cb";
const twilioClient = require("twilio")(accountSid, authToken);

const mongoURL = 'mongodb+srv://satish421:8w93dwNoqmjfBKQ5@cluster0.pl6tdpd.mongodb.net/?retryWrites=true&w=majorit'; // Update with your MongoDB URL

mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true}).then((err,done)=>{

    console.log("connected to db");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((err)=>{console.log(err)});



// // MongoDB connection
// const dbName = 'IRF-INDIAN RACE FANTASY';

// MongoClient.connect(mongoURL, (err, client) => {
//   if (err) throw err;
//   const db = client.db(dbName);
//   const users = db.collection('users');

  // Send OTP via Firebase
  
  // app.listen(PORT, () => {
  //   console.log(`Server is running on http://localhost:${PORT}`);
  // });
// });
