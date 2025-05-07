const Workout = require('../models/Workout');

exports.addWorkout = async (req, res) => {
  const workout = await Workout.create({ ...req.body, userId: req.user.id });
  res.status(201).json(workout);
};

exports.getMyWorkouts = async (req, res) => {
  const workouts = await Workout.find({ userId: req.user.id });
  res.status(200).json({ workouts });
};

exports.updateWorkout = async (req, res) => {
  const updated = await Workout.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  res.status(200).json({ message: "Workout updated successfully", updatedWorkout: updated });
};

exports.deleteWorkout = async (req, res) => {
  await Workout.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.status(200).json({ message: "Workout deleted successfully" });
};

exports.completeWorkoutStatus = async (req, res) => {
  const completed = await Workout.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { status: "completed" },
    { new: true }
  );
  res.status(200).json({ message: "Workout marked as completed", updatedWorkout: completed });
};
