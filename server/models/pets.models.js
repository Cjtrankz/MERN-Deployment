const mongoose = require('mongoose');

//schema
const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minLength: [3, "Name must be at least 3 characters"],
        unique: true
    },
    type: { 
        type: String,
        required: [true, "Type is required"],
        minLength: [3, "Type must be at least 3 characters"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minLength: [3, "Description must be at least 3 characters"]
    },
    skill1: {
        type: String
    },
    skill2: {
        type: String
    },
    skill3: {
        type: String
    }
}, {timestamps:true})

const Pet = mongoose.model("Pet", PetSchema);

module.exports = Pet;