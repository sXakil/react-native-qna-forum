const db = require('../models')

exports.questionById = (req, res) => {
    db.Question.findByIdAndRemove(req.params.qnId, (err, question) => {
        if(err) res.json({success: false, err})
        else res.json({success: true, question})
    })
}

/** @TODO */ 
exports.answerById = (req, res) => {
    db.Answer.findByIdAndRemove(req.params.ansId, (err, question) => {
        if(err) res.json({success: false, err})
        else res.json({success: true, question})
    })
}
