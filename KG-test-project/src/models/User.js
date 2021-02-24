const mongoose = require("mongoose");
const mongooseSeq = require("mongoose-sequence");

const autoIncrement = mongooseSeq(mongoose);

const userSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    _id: false
});

userSchema.plugin(autoIncrement, {
    id: 'userCounter'
});

module.exports = mongoose.model('User', userSchema);