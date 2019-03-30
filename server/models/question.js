const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    qnTitle: String,
    qnDescription: String,
    // qnAuthor: {
    //     id: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "User",
    //     },
    //     username: String,
    // },
    // qnCredit: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Profile",
    // },
    qnCreated: {
        type: Date,
        default: Date.now,
    },
    qnAnswers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
    }],
    // qnComments: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Comment",
    // }],
    // qnUpVotes: {
    //     type: Number,
    //     default: 0,
    // },
    // qnDownVotes: {
    //     type: Number,
    //     default: 0,
    // },
});

module.exports = mongoose.model("Question", questionSchema);