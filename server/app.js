const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	db = require('./models')
	GET = require('./helpers/get'),
	POST = require('./helpers/post'),
	PUT = require('./helpers/put'),
	DELETE = require('./helpers/delete');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/views'));
app.use(cors());

/** root */
app.get('/', (req, res) => {
	res.send("Nothing's here  👍");
});
/** get all questions */
app.get('/qn', GET.questions);
/** get questions by id */
app.get('/qn/:qnId', GET.questionById);
/** get all answers */
app.get('/qn/:qnId/ans', GET.answers);
/** get answers by id */
app.get('/qn/:qnId/ans/:ansId', GET.answerById);

/** post new question */
app.post('/qn', POST.newQuestion);
/** post new answer */
app.post('/qn/:qnId', POST.newAnswer);

/** update question by id */
app.put('/qn/:qnId', PUT.questionById);
/** update answer by id */
app.put('/qn/:qnId/ans/:ansId', PUT.answerById);

/** delete question by id */
app.delete('/qn/:qnId', DELETE.questionById);
/** delete answer by id */
app.delete('/qn/:qnId/ans/:ansId', DELETE.answerById);

/** listen to port 3000 */
app.listen(3001, 'localhost', () => {
	console.log('Server started');
});
