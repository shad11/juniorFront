const jwt = require("jsonwebtoken");
const config = require("config");

const SAFE_PATH = [
	'/api/auth/register',
	'/api/auth/login',
	'/api/auth/verify'
]

const authToken = (req, res, next) => {
	if (SAFE_PATH.includes(req.path) || req.method === "GET") {
		next();
	} else {
		const authHeader = req.headers.authorization;
		const token = authHeader && authHeader.split(" ")[1];
		if (!token) return res.status(401).json({message: "No token was identified!"});
	
		jwt.verify(token, config.get("jwtSecret"), (err, user) => {
			if (err) return res.status(403).json({message: "Token is incorrect!"});
			req.user = user;
			next();
		})
	}
};

module.exports = authToken;