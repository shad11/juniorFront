import jwt from 'jsonwebtoken';
import CONFIG from '../../../config/index';
import UserService from "../../../services/UserService";

export const registerUser = async (req, res) => {
	const { data, token } = await UserService.createUser(req.body);

	res.json({
		success: true,
		data,
		token,
	})
}

export const loginUser = async (req, res) => {
	const user = await UserService.loginUser(req.body);

	if (user) {
		res.json({
			success: true,
			data: user.data,
			token: user.token,
		})
	} else {
		res.status(404).json({
			message: "User not found. Please, make sure your data is correct!",
		})
	}
}

export const verifyUser = (req, res) => {
	const token = req.body.token.split(" ")[1];

	jwt.verify(token, CONFIG.JWT_SECRET, (err, decoded) => {
		if (err) {
			res.json({
				success: false,
				message: "Token is incorrect!"
			});
		} else {
			const tokenNew = jwt.sign({
				email: decoded.email,
				userID: decoded.userID,
			}, CONFIG.JWT_SECRET, {
				expiresIn: "1h",
			});

			res.json({
				success: true,
				token: `Bearer ${tokenNew}`,
			});
		}
	});
}