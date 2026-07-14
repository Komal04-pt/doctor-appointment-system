import express from "express";
import {
  getAllUsers,
  getLoginUser,
  getStats,
  getUserDetails,
  updatePassword,
  updateUser,
  userLogin,
  userRegister,
  createAdmin,
  getAllAdmins,
  getAdminDetails,
  updateAdmin,
  deleteAdmin,
} from "../controllers/userController.js";
import { isAdmin, userAuth } from "../middlewares/authMiddlewares.js";
import upload from "../middlewares/multer.js";
const router = express();
//REGISTER || POST
router.post("/register", userRegister);
//LOGIN || POST
router.post("/login", userLogin);
//UPDATE PROFILE || PATCH
router.patch("/update/:id", userAuth, upload.single("image"), updateUser);
//UPDATE PASSWORD || PATCH
router.patch("/update-password/:id", userAuth, updatePassword);
//GET ALL USERS || GET
router.get("/get-all", userAuth, isAdmin, getAllUsers);
//GET ALL STATS || GET
router.get("/get-stats", userAuth, isAdmin, getStats);
//GET  USERS DETAILS  || GET
router.get("/get-user/:id", userAuth, isAdmin, getUserDetails);
//GET LOGIN  USERS DETAILS  || GET
router.get("/get-login-user/:id", userAuth, getLoginUser);
//CREATE NEW ADMIN || POST
router.post("/create-admin", userAuth, isAdmin, createAdmin);
//GET ALL ADMINS || GET
router.get("/get-all-admins", userAuth, isAdmin, getAllAdmins);
//GET ADMIN DETAILS || GET
router.get("/get-admin/:id", userAuth, isAdmin, getAdminDetails);
//UPDATE ADMIN || PATCH
router.patch("/update-admin/:id", userAuth, isAdmin, updateAdmin);
//DELETE ADMIN || DELETE
router.delete("/delete-admin/:id", userAuth, isAdmin, deleteAdmin);
export default router;