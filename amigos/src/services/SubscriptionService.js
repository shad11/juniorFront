import { EventModel, UserModel } from "../db/models/index";

export default class SubscriptionService {
	/**
	 * 
	 * @param {Number} userID 
	 * @param {Number} eventID 
	 */
	static subscribeToEvent = async (userID, eventID) => {
		const targetEvent = await EventModel.findById(eventID);
		if (!targetEvent || targetEvent.applicants.indexOf(userID) !== -1) {
			return null;
		}

		targetEvent.applicants.push(userID);

		const targetUser =  await UserModel.findById(userID);
		targetUser.sentEvents.push(eventID);
		await UserModel.findByIdAndUpdate(userID, targetUser);

		return await EventModel
			.findByIdAndUpdate(eventID, targetEvent, {new: true})
			.select(["-__v"])
			.populate("applicants", ["-__v", "-password"])
	}

	/**
	 * 
	 * @param {Number} userID 
	 * @param {Number} eventID 
	 */
	static unsubscribeFromEvent = async (userID, eventID) => {
		const targetEvent = await EventModel.findById(eventID);
		targetEvent.applicants.splice(targetEvent.applicants.indexOf(userID), 1);
		
		const targetUser =  await UserModel.findById(userID);
		targetUser.sentEvents.splice(targetUser.sentEvents.indexOf(eventID), 1);
		await UserModel.findByIdAndUpdate(userID, targetUser);

		return await EventModel
			.findByIdAndUpdate(eventID, targetEvent, {new: true})
			.select(["-__v"])
			.populate("applicants", ["-__v", "-password"])
	}

	/**
	 * 
	 * @param {Number} userID 
	 * @param {Number} eventID 
	 */
	static allowUser = async (userID, eventID) => {
		const targetEvent = await EventModel.findById(eventID);
		targetEvent.membersAllowed.push(targetEvent.applicants.splice(targetEvent.applicants.indexOf(userID), 1)[0]);

		const targetUser = await UserModel.findById(userID);
		targetUser.sentEvents.splice(targetUser.sentEvents.indexOf(eventID), 1);
		targetUser.appliedEvents.push(eventID);
		await UserModel.findByIdAndUpdate(userID, targetUser);

		return await EventModel
			.findByIdAndUpdate(eventID, targetEvent, {new: true})
			.select(["-__v"])
			.populate("applicants", ["-__v", "-password"])
	}

	/**
	 * 
	 * @param {Number} userID 
	 * @param {Number} eventID 
	 */
	static denyUser = async (userID, eventID) => {
		const targetEvent = await EventModel.findById(eventID);
		targetEvent.membersDenied.push(targetEvent.applicants.splice(targetEvent.applicants.indexOf(userID), 1)[0]);

		const targetUser = await UserModel.findById(userID);
		targetUser.sentEvents.splice(targetUser.sentEvents.indexOf(eventID), 1);
		targetUser.deniedEvents.push(eventID);
		await UserModel.findByIdAndUpdate(userID, targetUser);

		return await EventModel
			.findByIdAndUpdate(eventID, targetEvent, {new: true})
			.select(["-__v"])
			.populate("applicants", ["-__v", "-password"])
	}
}