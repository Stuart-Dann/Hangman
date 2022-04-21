import express from 'express';
import randomWords from 'random-words';

const app = express();
app.use(express.static('client'));
app.listen(8080);

app.get('/words', (req, res) => {
	let word = randomWords();
});
