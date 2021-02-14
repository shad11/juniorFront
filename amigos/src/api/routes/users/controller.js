import jwt from 'jsonwebtoken';
import StatusService from "../../../services/StatusService";
import UserService from "../../../services/UserService";

export const getUserData = async (req, res) => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(" ")[1];

	if (!token)
		StatusService.buildResponse(null, null, 401, "No token was identified!");

	const { email } = jwt.decode(token);
	const userData = await UserService.getUserDataByEmail(email);

	StatusService.buildResponse(userData, res, 403, "Can't get data, something went wrong! Make sure you have correct token!");
}

export const getUserById = async (req, res) => {
	const user = await UserService.getUserById(Number(req.params.id));
	StatusService.buildResponse(user, res, 404, "User not found. Please, make sure your data is correct!");
}

export const changeUserData = async (req, res) => {
	const user = await UserService.changeUserData(Number(req.params.id), req.user, req.body);
	StatusService.buildResponse(user, res, 403, "Oops, something went wrong! Make sure you have correct token!");
}

export const deleteUser = async (req, res) => {
	const result = await UserService.deleteUser(Number(req.params.id), req.user);
	StatusService.buildResponse(result && "User was deleted", res, 403, "Oops, something went wrong! Make sure you have correct token!");
}