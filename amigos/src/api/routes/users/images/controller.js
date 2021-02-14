import ImageService from "../../../../services/ImageService";
import StatusService from "../../../../services/StatusService";

export const addNewUserImages = async (req, res) => {
	const updatedUser = await ImageService.addUserImages(req.body.photos, req.user.userID);
	StatusService.buildResponse(updatedUser, res);
}

export const deleteUserImage = async (req, res) => {
	const updatedUser = await ImageService.removeUserImage(req.body.photoID, Number(req.user.userID), Number(req.params.id));
	StatusService.buildResponse(updatedUser, res, 403, "User ID or token is incorrect!")
}

export const changeAvatar = async (req, res) => {
	const updatedUser = await ImageService.updateUserAvatar(req.body.photoID, Number(req.user.userID), Number(req.params.id));
	StatusService.buildResponse(updatedUser, res, 403, "User ID or token is incorrect!")
}