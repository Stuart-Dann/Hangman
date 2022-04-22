import express from 'express';
import randomWords from 'random-words';

const app = express();
app.use(express.static('client'));
app.listen(8080);

let shownWord;

app.get('/words', (req, res) => {
	let word = randomWords();
	for (let i = 0; i < word.length; i++) {
		shownWord.push('_');
	}
	res.json(word);
	res.json(shownWord);
});

app.post('/guess', express.json(), (req, res) => {
	guess = req.body.msg;
	res.json(guess);
});
