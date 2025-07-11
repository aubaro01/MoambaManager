const express = require("express");
const router = express.Router();
const {register, login} = require("../controller/authController");
const {refreshToken} = require ("../middlewares/authMiddleware");

router.post("/user/register", register);
router.post("/user/auth/login", login);
router.post("/user/auth/refresh", refreshToken);

module.exports = router;