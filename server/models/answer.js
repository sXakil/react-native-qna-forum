const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
    ansBody: String,
    // ansAuthor: {
    //     id: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "User",
    //     },
    //     username: String,
    // },
    // ansCredit: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Profile",
    // },
    ansCreated: {
        type: Date,
        default: Date.now,
    },
    // ansComments: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Comment",
    // }],
    ansUpVotes: {
        type: Number,
        default: 0,
    },
    ansDownVotes: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model("Answer", answerSchema);