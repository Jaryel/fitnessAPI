const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyUser } = require('../auth');

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/details", verifyUser, userController.details);

module.exports = router;
