const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    surName: String,
    gender: String,
    cakeDay: Date,
    email: String,
    phone: String,
    points: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
        default: "http://placehold.it/150x150",
    },
    bio: {
        type: String,
        default: 'N/A',
    },
    website: {
        type: String,
        default: '',
    },
    location: {
        type: String,
        default: 'N/A',
    },
    socialLinks: {
        type: Object,
        default: {
            facebook: '#',
            twitter: '#',
            linkedin: '#',
            github: '#',
        },
    },
    registrationDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Profile", profileSchema);