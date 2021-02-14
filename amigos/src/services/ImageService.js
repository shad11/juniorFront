import UserModel from "../db/models/user";
import cloudinary from "cloudinary";

export default class ImageService {
	/**
	 * 
	 * @param {[String]} photos 
	 * @param {Number} id 
	 */
	static addUserImages = async (photos, id) => {
		const user = await UserModel.findById(id);
		const newPhotosData = await Promise.all(photos.map(async (item) => {
			const {url, public_id} = await cloudinary.v2.uploader.upload(item, {
				folder: `users/${id}`,
			});
			return {
				photoURL: url, 
				photoID: public_id,
			}
		}));
		user.photos = [...user.photos, ...newPhotosData];

		return await UserModel.findByIdAndUpdate(id, user, {new: true}).select(["-__v", "-password"]);
	}
	
	/**
	 * 
	 * @param {String} photoID 
	 * @param {Number} userID 
	 * @param {Number} requestID 
	 */
	static removeUserImage = async (photoID, userID, requestID) => {
		if (userID !== requestID) return null;

		const user = await UserModel.findById(userID);
		const targetPhotoIndex = user.photos.findIndex(item => item.photoID === photoID);
		user.photos.splice(targetPhotoIndex, 1);

		await cloudinary.v2.uploader.destroy(photoID);

		return await UserModel.findByIdAndUpdate(userID, user, {new: true}).select(["-__v", "-password"]);
	}

	/**
	 * 
	 * @param {String} photoID 
	 * @param {Number} userID 
	 * @param {Number} requestID 
	 */
	static updateUserAvatar = async (photoID, userID, requestID) => {
		if (userID !== requestID) return null;

		const user = await UserModel.findById(userID);
		const targetImageIndex = user.photos.findIndex(item => item.photoID === photoID);
		user.photos.unshift(user.photos.splice(targetImageIndex, 1)[0]);

		return await UserModel.findByIdAndUpdate(userID, user, {new: true}).select(["-__v", "-password"]);
	}

	/**
	 * 
	 * @param {String} filename 
	 * @param {Number} userID 
	 * @param {Number} postID 
	 * !!!! DEPRECATED !!!!
	 */
	// static deleteEventImage = async (filename, userID, eventID) => {
	// 	const user = await UserModel.findById(userID);
	// 	if (!user.events.find(item => item === eventID)) return null;

	// 	const targetEvent = await EventModel.findById(eventID);
	// 	const targetImageIndex = targetEvent.photos.findIndex(item => {
	// 		const parsedPath = item.split("\\");
	// 		return parsedPath[parsedPath.length - 1] === filename;
	// 	})
	// 	targetEvent.photos.splice(targetImageIndex, 1);
	// 	fs.unlinkSync(path.join(__dirname, `../uploads/events/${userID}/${filename}`));
	// 	return await EventModel.findByIdAndUpdate(eventID, targetEvent, {new: true}).select(["-__v"]);
	// }
}