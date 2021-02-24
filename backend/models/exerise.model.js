const mongoose = require('mongoose')

const Shema = mongoose.Schema;

const exerciseschema = new Shema({
    username: {type: String, required: true},
    description: {type: String, required: true},
    duration: {type: Number, required: true},
    date: {type: Date, required: true},
}, {
    timestamps: true
})

const Exercise = mongoose.model('Exercise', exerciseschema)

module.exports = Exercise
