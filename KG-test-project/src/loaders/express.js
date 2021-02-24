const bodyParser = require("body-parser");
const authToken = require("../middleware/authToken");

const expressLoader = async (app) => {
    app.use(bodyParser.json({limit: "50mb"}));
    app.use(authToken);
    app.use('/api/auth', require('../routes/auth'));
    app.use('/api/staff', require('../routes/staff'));
}

module.exports = expressLoader;