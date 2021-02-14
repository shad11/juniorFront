export default class StatusService {
	static buildResponse = (data, res, errorCode, errorMsg) => {
		if (errorCode && errorMsg) {
			if (data) {
				res.json({
					success: true,
					data,
				})	
			} else {
				res.status(errorCode).json({
					message: errorMsg,
				})
			}
		} else {
			res.json({
				data,
				success: true,
			})
		}
	}
}