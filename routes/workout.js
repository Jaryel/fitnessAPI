const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');
const { verifyUser } = require('../auth');

router.post("/addWorkout", verifyUser, workoutController.addWorkout);
router.get("/getMyWorkouts", verifyUser, workoutController.getMyWorkouts);
router.patch("/updateWorkout/:id", verifyUser, workoutController.updateWorkout);
router.delete("/deleteWorkout/:id", verifyUser, workoutController.deleteWorkout);
router.patch("/completeWorkoutStatus/:id", verifyUser, workoutController.completeWorkoutStatus);

module.exports = router;
