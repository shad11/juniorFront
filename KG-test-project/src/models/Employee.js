const mongoose = require("mongoose");
const mongooseSeq = require("mongoose-sequence");

const autoIncrement = mongooseSeq(mongoose);

const employeeSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    fullName: {
        type: String,
        required: true,
        unique: true
    },
    sex: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    phone: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    creator: {
        type: Number,
        required: true,
        ref: 'User'
    },
    createDate: Number
}, {
    _id: false,
    timestamps: {
        createdAt: 'createDate'
    }
});

employeeSchema.plugin(autoIncrement, {
    id: 'staffCounter'
});

module.exports = mongoose.model('Employee', employeeSchema, 'staff');