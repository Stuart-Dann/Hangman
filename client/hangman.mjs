// const prompt = require('prompt-sync')({ sigint: true });
// import e from 'express';
// import { response } from 'express';
import { draw } from "./draw.mjs";
import { home } from "./home.mjs";

// const randomWord = (words) => words[Math.floor(Math.random() * words.length)];
let lives = 9;
let word;
let shownWord = [];
let guesses = [];
let local;
let gameOver = false;

async function loadWord() {
	const response = await fetch("words");
	word = await response.json();
	shownWord = word.shownWord;
	document.querySelector("#domWord").textContent = shownWord.join(" ");
}

async function loadGuess(guess, shownWord) {
	let payload = { msg: guess, shownWord: shownWord, gameOver: gameOver };

	const response = await fetch("words", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const svrGuess = await response.json();
		shownWord = svrGuess.shownWord;
		responseToServer(svrGuess.shownWord, svrGuess.correct, svrGuess.guessed, svrGuess.guess);
	} else {
		console.log("Error");
	}
}

function responseToServer(shownWord, correct, guessed, guess) {
	const domword = document.querySelector("#domWord");
	domword.textContent = shownWord.join(" ");
	if (!guessed) {
		document.querySelector("#guessed").textContent += guess + " ";
		lives -= 1;
		draw(lives);
		if (lives <= 0) {
			endScreen(false);
		}
		if (correct) {
			document.querySelector("#status").textContent = "Correct";
		} else {
			document.querySelector("#status").textContent = "Incorrect";
		}
		if (!shownWord.includes("_")) {
			endScreen(true);
		}
	} else {
		document.querySelector("#status").textContent = `You have already guessed ${guess}!`;
	}
}

function setup() {
	if (document.querySelector("#screen-cover")) {
		document.querySelector("#screen-cover").remove();
	}
	toggleDisableKeys(false);
	document.querySelector("#status").textContent = "Click a button to start guessing...";
	document.querySelector("#guessed").textContent = "Letters Guessed:";
	lives = 9;
	//If Vs local is selected
	if (local == true) {
		document.body.removeEventListener("keyup", keyupEvent);

		const cover = createCover();

		const text = document.createElement("h1");
		text.id = "localH1";
		text.textContent = "Enter a Word:";
		cover.prepend(text);

		const input = document.createElement("input");
		input.type = "text";
		input.id = "local-word";
		cover.append(input);

		const button = document.createElement("button");
		button.textContent = "Submit";
		button.addEventListener("click", () => {
			word = document.querySelector("#local-word").value;
			shownWord = [];
			guesses = [];
			for (let i = 0; i < word.length; i++) {
				shownWord.push("_");
			}
			document.querySelector("#domWord").textContent = shownWord.join(" ");
			document.querySelector("#screen-cover").remove();
			document.body.addEventListener("keyup", keyupEvent);
		});
		cover.append(button);
	} else {
		gameOver = false;
		loadWord();
		document.body.addEventListener("keyup", keyupEvent);
	}
	draw(lives);
}

function bttnAttcher() {
	const keys = document.querySelectorAll(".key");
	for (const key of keys) {
		key.addEventListener("click", buttonEvent);
	}
	const reset = document.querySelector("#reset-button");
	reset.addEventListener("click", setup);
}

function toggleDisableKeys(bool) {
	const keys = document.querySelectorAll(".key");
	for (const key of keys) {
		key.disabled = bool;
	}
}

window.addEventListener("load", () => {
	home();
});

export function hangmanloaded(e) {
	if (e == "Vs Local") {
		local = true;
	} else {
		local = false;
	}
	setup(local);
	makeKeyboard();
	bttnAttcher();
}

//make the on screen keyboard when page is loaded
function makeKeyboard() {
	const keyboard = document.querySelector("#keyboard");
	const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	for (const letter of alpha) {
		const elem = document.createElement("button");
		elem.classList.add("key");
		elem.textContent = letter;
		keyboard.append(elem);
	}
}
function keyupEvent(e) {
	const keys = document.querySelectorAll(".key");
	for (const key of keys) {
		if (key.textContent == e.key.toUpperCase()) {
			key.disabled = true;
		}
	}
	if (local) {
		checkGuess(e.key);
	} else {
		loadGuess(e.key, shownWord);
	}
}

function buttonEvent(e) {
	e.target.disabled = true;
	if (local) {
		checkGuess(e.target.textContent.toLowerCase());
	} else {
		loadGuess(e.target.textContent.toLowerCase(), shownWord);
	}
}

function checkGuess(letter) {
	//Check if a key from the computer keyboard has been clicked instead of the on screen
	const status = document.querySelector("#status");
	if (guesses.includes(letter)) {
		status.textContent = `You have already guessed ${letter}!`;
		return;
	}
	if (word.includes(letter)) {
		status.textContent = "Correct!";
		for (let i = 0; i < word.length; i++) {
			if (word[i] === letter) shownWord[i] = letter;
		}
		guesses.push(letter);
	} else {
		status.textContent = "Incorrect!";
		lives -= 1;
		draw(lives);
		if (lives <= 0) {
			status.textContent = "You Lose!";
			toggleDisableKeys(true);
			endScreen(false);
		}
		document.querySelector("#guessed").textContent += letter + " ";
		guesses.push(letter);
	}
	if (!shownWord.includes("_")) {
		status.textContent = "You Win!";
		toggleDisableKeys(true);
		endScreen(true);
	}
	document.querySelector("#domWord").textContent = shownWord.join(" ");
}

function endScreen(win) {
	document.body.removeEventListener("keyup", keyupEvent);
	const cover = createCover();
	if (win) {
		const text = document.createElement("h1");
		text.textContent = "You win!";
		cover.prepend(text);
	} else {
		const text = document.createElement("h1");
		text.textContent = "You Lose!";
		cover.prepend(text);
	}
	const button = document.createElement("button");
	button.id = "reset";
	button.textContent = "New Game";
	button.style.margin = "auto";
	button.style.fontSize = "2em";
	cover.append(button);
	button.addEventListener("click", setup);

	const text = document.createElement("p");
	text.id = "word-reveal";
	if (local) {
		text.textContent = word;
	} else {
		text.textContent = word.word;
	}
	cover.append(text);
}

function createCover() {
	const cover = document.createElement("div");
	cover.id = "screen-cover";
	cover.classList.toggle("fade");
	document.body.prepend(cover);
	return cover;
}
