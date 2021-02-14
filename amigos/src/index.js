import "@babel/polyfill";
import express from "express";
import path from "path";
import CONFIG from "./config/index";
import appLoader from "./loaders/index";

const startServer = async () => {
	const app = express();

	await appLoader(app);
	app.use(express.static(path.resolve(__dirname, "../client/build")));
	app.use("/src/uploads", express.static(path.resolve(__dirname, "./uploads")));

	app.listen(CONFIG.PORT, () => {
		console.log(`############## Server has started on port ${CONFIG.PORT}! ##############`);
	})
};

startServer();