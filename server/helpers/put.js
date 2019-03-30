const db = require('../models')

exports.questionById = (req, res) => {
    db.Question.findByIdAndUpdate(
        req.params.qnId, 
        {
            qnTitle: req.body.qnTitle,
            qnDescription: req.body.qnDescription,
        },
        (err, question) => {
        if(err) res.send(err)
        else res.send(question)
    })
}

exports.answerById = (req, res) => {
    db.Answer.findByIdAndUpdate(
        req.params.ansId, 
        {ansBody: req.body.ansBody},
        (err, answer) => {
            if(err) res.send(err)
            else res.send(answer)
    })
}
