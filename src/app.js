const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const MongoClient = require('mongodb').MongoClient;

const app = express();
app.use("/users", userRouter);
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

// MongoDB connection
const mongoURL = 'mongodb+srv://satish421:8w93dwNoqmjfBKQ5@cluster0.pl6tdpd.mongodb.net/?retryWrites=true&w=majority'; // Update with your MongoDB URL
const dbName = 'phoneAuthDemo';

MongoClient.connect(mongoURL, (err, client) => {
  if (err) throw err;
  const db = client.db(dbName);
  const users = db.collection('users');

  // Send OTP via Firebase
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
