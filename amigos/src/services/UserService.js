import { EventModel, UserModel} from "../db/models/index";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import CONFIG from "../config/index";
import EventService from "./EventService";
import cloudinary from "cloudinary";

export default class UserService {
	/**
	 * @desc Get user by its _id value from mongodb
	 */
	static getUserById = async (id) => {
		const user = await UserModel
			.findById(id)
			.select(["-__v", '-password']);
		
		return user ? await user.execPopulate("events", ['-__v']) : null;
	}

	/**
	 * @desc Create user on registration and save it to mongodb
	 */
	static createUser = async (userData) => {		
		const { password } = userData;
		const hashedPassword = await argon2.hash(password);

		const user = await UserModel.create({
			...userData,
			yearOfBirth: new Date(userData.birthday).getFullYear(),
			password: hashedPassword,
		});

		const token = jwt.sign({
			email: user.email,
			userID: user._id,
		}, CONFIG.JWT_SECRET, {
			expiresIn: "1h",
		})
		
		return {
			data: {
				...user.toObject(),
				__v: undefined,
				password: undefined,
			},
			token: `Bearer ${token}`,
		};	
	}

	/**
	 * @desc Login user. Creating token
	 */
	static loginUser = async ({email, password}) => {
		const user = await UserService.getUserDataByEmail(email);

		if (user && await argon2.verify(user.password, password)) {
			const token = jwt.sign({
				email: email,
				userID: user._id,
			}, CONFIG.JWT_SECRET, {
				expiresIn: "1h",
			});

			const data = user.toObject();
			delete data.password;

			return {
				token: `Bearer ${token}`, 
				data,
			}
		}
		return null;
	}

	/**
	 * @desc Get all data from DB by user email
	 */
	static getUserDataByEmail = email => {
		return UserModel
			.findOne({email: email})
			.populate({
				path: "events",
				select: ["-__v"],
				populate: {
					path: "applicants",
					select: ["birthday", "firstName", "_id", "photos"],
				}
			})
			.populate({
				path: "sentEvents",
				select: ["-__v"],
				populate: {
					path: "author",
					select: ["birthday", "firstName", "_id", "photos"],
				}
			})
			.select(["-__v"]);
	}

	/**
	 * @desc Delete user from mongodb by its token
	 */
	static deleteUser = async (id, reqUser) => {
		if (id !== reqUser.userID) return null;
		const user = await UserModel.findById(id);

		user.events.forEach(eventID => EventService.deleteEvent(id, eventID));

		user.sentEvents.forEach(async (sentEventID) => {
			const sentEvent = await EventModel.findById(sentEventID);
			sentEvent.applicants.splice(sentEvent.applicants.indexOf(id), 1);
			await EventModel.findByIdAndUpdate(sentEventID, sentEvent);
		})
		user.appliedEvents.forEach(async (appliedEventID) => {
			const appliedEvent = await EventModel.findById(appliedEventID);
			appliedEvent.membersAllowed.splice(appliedEvent.membersAllowed.indexOf(id), 1);
			await EventModel.findByIdAndUpdate(appliedEventID, appliedEvent);
		})
		user.deniedEvents.forEach(async (deniedEventID) => {
			const deniedEvent = await EventModel.findById(deniedEventID);
			deniedEvent.membersDenied.splice(deniedEvent.membersDenied.indexOf(id), 1);
			await EventModel.findByIdAndUpdate(deniedEventID, deniedEvent);
		})

		await cloudinary.v2.api.delete_resources_by_prefix(`/users/${id}`);
		await cloudinary.v2.api.delete_resources_by_prefix(`/events/${id}`);

		return await UserModel.findByIdAndDelete(id);
	}

	/**
	 * @desc Change user data in mongodb by its token
	 */
	static changeUserData = async (id, reqUser, reqBody) => {
		if (id !== reqUser.userID) return null;

		const {password: oldPassword} = await UserService.getUserById(id);
		if (!reqBody.password || argon2.verify(oldPassword, reqBody.password)) {
			return await UserModel.findByIdAndUpdate(id, reqBody, {new: true}).select(["-__v", '-password']);
		}
		const newPassword = await argon2.hash(password);
		return await UserModel.findByIdAndUpdate(id, {...reqBody, password: newPassword}, {new: true}).select(["-__v", '-password']);
	}
}