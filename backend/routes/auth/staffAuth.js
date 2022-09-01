require("dotenv").config();
const path = require("path");
const express = require("express");
const router = express.Router();
const { databaseEcommerce } = require("../../index");
const jwt = require("jsonwebtoken");
let staffModel = require("./../staffs/staff").staffModel;
const { Validator, AuthToken } = require("../../middleware/middleware");
const bcrypt = require("bcrypt");
const fs = require("fs");

/**
 * Multer module to parse multipart/form-data
 */
const multer = require("multer");

/**
 * Setting storage engiene
 */
const storage = multer.diskStorage({
  destination: "./public/images/staffs",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

/**
 * Setting multar storage and file filter
 */
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetype = /.jpg|.png|.jpeg|.gif/;
    let ValidFileExt = filetype.test(path.extname(file.originalname));
    let ValidMimeType = filetype.test(file.mimetype);
    if (ValidFileExt && ValidMimeType) {
      cb(null, true);
    } else {
      cb("Error: Image invalid");
    }
  },
}).single("avatar");

/**
 * Middleware to handle err while getting file content
 */
function multerMiddleWare(req, res, next) {
  upload(req, res, (err) => {
    if (err) {
      res.json({ status: "failure", message: err });
    } else {
      next();
    }
  });
}

/**
 * Post request handler for register path
 * Checks if the format of data is correct
 * If the format is correct it hashes password and saves to database
 */
router.post(
  "/register",
  multerMiddleWare,
  Validator.validateStaffsData,
  async (req, res) => {
    try {
      req.userData.role = "delivery";
      userData = await databaseEcommerce.findOrCreate(
        { username: req.userData.username },
        req.userData,
        {},
        staffModel
      );
      if (userData.msg == "User Found") {
        fs.unlink(
          path.join("./public/images/staffs", req.file.filename),
          (err) => {
            console.log(err);
          }
        );
        res.status(403).json({ failed: "Staffs exists" });
        return;
      } else if (userData.msg == "User Created") {
        res.status(201).json({ success: "Staff Created" });
        return;
      }
    } catch (err) {
      console.log(err);
      res.status(503).json({ failure: "Error while creating user" });
    }
  }
);

/**
 * Post request handler to register admin
 * Check if the request is made by admin
 * Validate Info
 * Adds to database
 */
router.post(
  "/register-admin",
  AuthToken.jwtAuthentication,
  multerMiddleWare,
  Validator.validateStaffsData,
  async (req, res) => {
    if (req.user.role !== "admin") {
      res.json({ status: "error", message: "only accessible by admin" });
      return;
    }
    req.userData.role = "admin";
    try {
      let userData = await databaseEcommerce.findOrCreate(
        { username: req.userData.username },
        req.userData,
        {},
        staffModel
      );
      if (userData.msg == "User Found") {
        res.status(403).json({ failed: "Staffs exists" });
        return;
      } else if (userData.msg == "User Created") {
        res.status(201).json({ success: "Staff Created" });
        return;
      }
    } catch (err) {
      res.status(503).json({ failure: "Error while creating user" });
    }
  }
);

router.get("/get-access-token",AuthToken.createStaffAccessToken)

/**
 * Post handler for /login
 * Checks if the username or password is undefined
 * Compares data to database if matched creates a jwt and sends to user
 */
router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username == undefined || password == undefined) {
    res
      .status(403)
      .json({ status: "error", message: "No username or password" });
    return;
  }
  try {
    userInformation = await databaseEcommerce.fetchDatabase(
      { username: username },
      {},
      staffModel
    );
    if (bcrypt.compareSync(password, userInformation.data[0].password)) {
      let payload = {
        username: userInformation.data[0].username,
        email: userInformation.data[0].email,
        role: userInformation.data[0].role,
        profile: {
          fName: userInformation.data[0].profile.fName,
          lName: userInformation.data[0].profile.lName,
        },
      };
      
      const token = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN);
      res.setHeader("Access-Control-Allow-Credentials", true)
      res.cookie("refresh-token","Bearer "+token, {
        httpOnly: true,
        maxAge:10*12*30*24*60*60*60*1000,
        sameSite: false,
        path:"/",
        signed:false,
        secure: true,
      });
      res.json({ refreshToken: token });
      return;
    } else {
      res.status(403).json({ status: "error", message: "Password do not match" });
      return;
    }
  } catch (error) {
    res.status(403).json({ status: "error", message: "User not found" });
  }
});

module.exports = {
  router,
};
