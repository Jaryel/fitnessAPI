require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect(process.env.MONGODB_STRING)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use(express.json());

const workoutRoutes = require('./routes/workout');
const userRoutes = require('./routes/user');

app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);

if(require.main === module){
  app.listen(process.env.PORT || 4000, () => {
    console.log(`API is now online on port ${ process.env.PORT || 4000 }`);
  });
}

module.exports = { app, mongoose };
