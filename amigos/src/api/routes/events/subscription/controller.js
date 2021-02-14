import StatusService from "../../../../services/StatusService";
import SubscriptionService from "../../../../services/SubscriptionService"

export const subscribeToEvent = async (req, res) => {
	const updatedEvent = await SubscriptionService.subscribeToEvent(Number(req.user.userID), Number(req.params.id));
	StatusService.buildResponse(updatedEvent, res, 403, "You have already subscribed to this event!");
}

export const unsubscribeFromEvent = async (req, res) => {
	const updatedEvent = await SubscriptionService.unsubscribeFromEvent(Number(req.user.userID), Number(req.params.id));
	StatusService.buildResponse(updatedEvent, res);
}

export const allowUser = async (req, res) => {
	const updatedEvent = await SubscriptionService.allowUser(Number(req.body.userID), Number(req.params.id));
	StatusService.buildResponse(updatedEvent, res);
}

export const denyUser = async (req, res) => {
	const updatedEvent = await SubscriptionService.denyUser(Number(req.body.userID), Number(req.params.id));
	StatusService.buildResponse(updatedEvent, res);
}