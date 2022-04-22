import express from "express";
import randomWords from "random-words";

const app = express();
app.use(express.static("client"));

let shownWord = [];
let guess;
let guesses = [];
let guessed = false;
let correct;
let word;
let gameOver;

app.get("/words", (req, res) => {
	word = randomWords();
	shownWord = [];
	guesses = [];
	for (let i = 0; i < word.length; i++) {
		shownWord.push("_");
	}
	res.json({ word: word, shownWord: shownWord });
});

app.post("/words", express.json(), (req, res) => {
	guess = req.body.msg;
	gameOver = req.body.gameOver;
	if (guesses.includes(guess)) {
		guessed = true;
	} else if (word.includes(guess)) {
		correct = true;
		guessed = false;
		guesses.push(guess);
		for (let i = 0; i < word.length; i++) {
			if (word[i] === guess) shownWord[i] = guess;
		}
	} else {
		guessed = false;
		correct = false;
		guesses.push(guess);
	}
	if (gameOver) {
		guesses = [];
	}
	res.json({ shownWord: shownWord, guess: guess, guessed: guessed, correct: correct });
});

app.listen(8080);
