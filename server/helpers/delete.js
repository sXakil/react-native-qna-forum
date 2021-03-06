const db = require('../models');

exports.questionById = (req, res) => {
	db.Question.findByIdAndRemove(req.params.qnId, (err, question) => {
		if (err) res.json({ success: false, err });
		else {
			question.qnAnswers.map((answerId) => {
				db.Answer.findByIdAndRemove(answerId).then((ans) => console.log('deleted' + ans));
			});
			res.json({ success: true, question });
		}
	});
};

/** @TODO */

exports.answerById = (req, res) => {
	db.Question.findById(req.params.qnId, (err, question) => {
		if (err) res.json({ success: false, err });
		else {
            db.Answer.findByIdAndRemove(req.params.ansId, (err, answer) => {
                if (err) {
                    res.send(err)
                } else {
                    question.qnAnswers.pull(answer);
                    question.save();
                }
                res.json({ success: true, question });
            }
            )}
	});
};