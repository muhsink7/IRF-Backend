const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const credentials = require('./sample-irf-firebase-adminsdk-go66e-ab6a485b45.json');
// const userRouter = require('./routes/userRoutes');
// const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
// const userRouter = require('./routes/userRoutes');



const app = express();
app.use(bodyParser.json());
app.use("/users",userRouter);
const PORT = process.env.PORT || 3000;
const mongoURL = 'mongodb+srv://satish421:8w93dwNoqmjfBKQ5@cluster0.pl6tdpd.mongodb.net/?retryWrites=true&w=majorit'; // Update with your MongoDB URL



mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true}).then((err,done)=>{

    console.log("connected to db");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((err)=>{console.log(err)});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

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
