import express from "express";
import {
  getRecipe,
  uploadRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipesController.js";

import {
  getUser,
  uploadUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

import {
  getSupport,
  uploadSupport,
  updateSupport,
  deleteSupport,
} from "../controllers/supportController.js";

import {
  getAdmin,
  uploadAdmin,
  updateAdmin,
  deleteAdmin,
} from "../controllers/adminController.js";

import {
  getIngredient,
  uploadIngredient,
  updateIngredient,
  deleteIngredient,
} from "../controllers/ingredientController.js";

import {
  getSession,
  uploadSession,
  updateSession,
  deleteSession,
} from "../controllers/sessionController.js";

const indexRouter = express.Router();

indexRouter
  .route("/recipes")
  .get(getRecipe)
  .post(uploadRecipe)
  .delete(deleteRecipe);

indexRouter.route("/recipesbyobj").post(getRecipe);

indexRouter
  .route("/recipes/:id")
  .get(getRecipe)
  .patch(updateRecipe)
  .delete(deleteRecipe);

indexRouter
  .route("/support")
  .get(getSupport)
  .post(uploadSupport)
  .delete(deleteSupport);

indexRouter
  .route("/support/:id")
  .get(getSupport)
  .patch(updateSupport)
  .delete(deleteSupport);

indexRouter.route("/users").get(getUser).post(uploadUser).delete(deleteUser);

indexRouter
  .route("/users/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

indexRouter.route("/admin").get(getAdmin).post(uploadAdmin).delete(deleteAdmin);

indexRouter
  .route("/admin/:id")
  .get(getAdmin)
  .patch(updateAdmin)
  .delete(deleteAdmin);

indexRouter
  .route("/ingredients")
  .get(getIngredient)
  .post(uploadIngredient)
  .delete(deleteIngredient);

indexRouter
  .route("/ingredients/:id")
  .get(getIngredient)
  .patch(updateIngredient)
  .delete(deleteIngredient);

indexRouter
  .route("/session")
  .get(getSession)
  .post(uploadSession)
  .delete(deleteSession);

indexRouter
  .route("/session/:id")
  .get(getSession)
  .patch(updateSession)
  .delete(deleteSession);

export default indexRouter;
