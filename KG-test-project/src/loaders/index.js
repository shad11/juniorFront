const expressLoader = require("./express");
const mongoDBLoader = require("./mongodb")

const appLoaders = async (app) => {
    await mongoDBLoader(app);
    console.log('------- MongoDB was loaded -------');

    await expressLoader(app);
    console.log('------- Express was loaded -------');
}

module.exports = appLoaders;