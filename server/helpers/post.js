const db = require('../models')

exports.newQuestion = (req, res) => {
    let data = {
        qnTitle: req.body.qnTitle,
        qnDescription: req.body.qnDescription,
    }
    db.Question.create(data, (err, question) => {
        if (err) {
            res.send(err)
        } else {
            res.redirect('/qn/' + question._id)
        }
    })
}

exports.newAnswer = (req, res) => {
    db.Question.findById(req.params.qnId)
        .populate('qnAnswers')
        .exec((err, question) => {
        if (err) {
            res.send(err)
        } else {
            db.Answer.create({ansBody: req.body.ansBody}, (err, answer) => {
                if(err) res.send(err)
                else {
                    question.qnAnswers.push(answer)
                    question.save()
                    res.send(answer)
                }
            })
        }
    })
}