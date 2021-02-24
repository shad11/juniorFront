const mongoose = require("mongoose");
const config = require("config");

const mongoDDLoader = async () => {
    try {
        await mongoose.connect(config.get('dbConfig.URI'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        mongoose.set('useFindAndModify', false);
    } catch (e) {
        console.log('Server DB error', e.message);
        process.exit(1);
    }
}

module.exports = mongoDDLoader;
