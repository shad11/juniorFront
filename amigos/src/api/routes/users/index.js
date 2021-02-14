import { Router } from "express";
import { getUserData, getUserById, changeUserData, deleteUser } from "./controller";
import errorHandler from "../../../errors/routeErrorController";
import imageController from "./images/index";

const route = Router();

export default baseRouter => {
	baseRouter.use("/users", route);

	imageController(route);
	route.get("/", errorHandler(getUserData));
	route.get("/:id", errorHandler(getUserById));
	route.put("/:id", errorHandler(changeUserData));
	route.delete("/:id", errorHandler(deleteUser));
}