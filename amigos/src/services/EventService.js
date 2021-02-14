import { UserModel, EventModel } from "../db/models";
import UserService from "./UserService";
import cloudinary from "cloudinary";

export default class EventService {
	/**
	 * 
	 * @param {Object} data
	 * @param {Number} userID 
	 */
	static createEvent = async (data, userID) => {
		const imageRes = await cloudinary.v2.uploader.upload(data.photo, {
			folder: `events/${userID}`,
		});

		const newEvent = await EventModel.create({
			author: userID,
			// ------------------------
			// description: data.description,
			// category: data.category,
			// dateStart: data.dateStart,
			// dateEnd: data.dateEnd,
			// peopleWanted: data.peopleWanted,
			// city: data.city,
			// address: data.address,
			// ------------------------
			// ===
			...data,
			photo: imageRes.url,
			photoPublicID: imageRes.public_id,
		});

		const eventCreator = await UserModel.findById(userID);
		eventCreator.events.push(newEvent._id);
		await UserModel.findByIdAndUpdate(userID, eventCreator);

		return {
			...newEvent.toObject(), 
			__v: undefined
		};
	}

	/**
	 * 
	 * @param {Number} eventId 
	 */
	static getEventById = async (eventId) => {
		const event = await EventModel.findById(eventId).select(["-__v"]);
	
		return event ? await event.execPopulate("author", ["-__v", "-password"]) : null;
	}

	/**
	 * 
	 * @param {Number} userID 
	 * @param {Number} eventID 
	 */
	static deleteEvent = async (userID, eventID) => {
		const user = await UserModel.findById(userID);
		const targetEvent = await EventModel.findById(eventID);
		if (targetEvent.author !== userID) return null;
		
		const targetEventIndex = user.events.findIndex(item => item === eventID);
		user.events.splice(targetEventIndex, 1);
		
		await cloudinary.v2.uploader.destroy(targetEvent.photoPublicID);
		
		// Clear all subscritions from event
		console.log({
			a: targetEvent.applicants,
			b: targetEvent.membersAllowed,
			c: targetEvent.membersDenied
		});
		targetEvent.applicants.forEach(async (applicantID) => {
			const applicant = await UserModel.findById(applicantID);
			applicant.sentEvents.splice(applicant.sentEvents.indexOf(eventID), 1);
			await UserModel.findByIdAndUpdate(applicantID, applicant);
		})
		targetEvent.membersAllowed.forEach(async (allowedID) => {
			const allowed = await UserModel.findById(allowedID);
			allowed.sentEvents.splice(allowed.sentEvents.indexOf(eventID), 1);
			await UserModel.findByIdAndUpdate(allowedID, allowed);
		})
		targetEvent.membersDenied.forEach(async (deniedID) => {
			const denied = await UserModel.findById(deniedID);
			denied.sentEvents.splice(denied.sentEvents.indexOf(eventID), 1);
			await UserModel.findByIdAndUpdate(deniedID, denied);
		})

		await EventModel.findByIdAndDelete(eventID);
		await UserModel.findByIdAndUpdate(userID, user);
		return await UserService.getUserById(userID);
	}

	/**
	 * 
	 * @param {Number} userID 
	 * @param {Number} eventID 
	 * @param {Object} eventData 
	 */
	static changeEventData = async (userID, eventID, eventData) => {
		const targetEvent = await EventModel.findById(eventID);
		if (targetEvent.author !== userID) return null;
		
		const updatedEvent = {
			...targetEvent,
			...eventData,
			photo: targetEvent.photo,
			photoPublicID: targetEvent.photoPublicID,
		}

		if (eventData.photo) {
			await cloudinary.v2.uploader.destroy(targetEvent.photoPublicID);
			const newPhoto = await cloudinary.v2.uploader.upload(eventData.photo, {
				folder: `events/${userID}`,
			});
			updatedEvent.photo = newPhoto.url;
			updatedEvent.photoPublicID = newPhoto.public_id;
		}
		
		return await EventModel.findByIdAndUpdate(eventID, updatedEvent, {new: true}).select(["-__v"]);
	}
}