import {Router} from "express";
import { getEventById, changeEvent, deleteEvent, createEvent } from "./controller";
import errorHandler from "../../../errors/routeErrorController";
import subscriptionController from "./subscription/index";

const route = Router();

export default (baseRouter) => {
	baseRouter.use("/events", route);

	subscriptionController(route);
	route.get("/:id", errorHandler(getEventById));
	route.post("/", errorHandler(createEvent));
	route.put("/:id", errorHandler(changeEvent));
	route.delete("/:id", errorHandler(deleteEvent));
}