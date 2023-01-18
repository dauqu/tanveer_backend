const express = require("express");
const router = express.Router();
const UsersSchema = require("./../models/users_schema");
const JWT = require("jsonwebtoken");

require("dotenv").config();

// //Get Profile
// router.get("/", async (req, res) => {

//     //Check user have token or not
//     const token = req.cookies.auth_token || req.body.token || req.headers["x-auth-token"];
//     // console.log(token);
//     if (token === undefined || token === null || token === "") {
//         return res.status(401).json({ message: "Unauthorized" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     try {
//         const user = await UsersSchema.findOne({ _id: decoded.id });
//         res.status(200).json(user);

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// code to get user profile
router.get("/", async (req, res) => {
  try {
    let token = req.cookies.token || req.headers["token"];

    if (token != undefined || token != null || token != "") {
      const have_valid_token = JWT.verify(token, process.env.JWT_SECRET);
      const id_from_token = have_valid_token.id;
      const user_data = await UsersSchema.findById(id_from_token);
      res.json({
        message: "You are login",
        status: "success",
        data: user_data,
        // token: token,
      });
    } else {
      req.json({ message: "You are not login ", status: "warning" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

// route to check user is login or not
router.get("/check", async (req, res) => {
  try {
    let token = req.cookies.token || req.headers["token"];

    if (token != undefined || token != null || token != "") {
      const have_valid_token = JWT.verify(token, process.env.JWT_SECRET);
      const id_from_token = have_valid_token.id;

      const user_data = await UsersSchema.findById(id_from_token);
      res.json({
        message: "You are login & you have token",
        status: "success",
        // data: user_data,
        token: token,
      });
    } else {
      res.json({ message: "You are not login , ", status: "warning" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

module.exports = router;
