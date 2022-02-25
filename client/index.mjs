// const prompt = require('prompt-sync')({ sigint: true });
// import e from 'express';
import { draw } from './draw.mjs';

const wordList = [
	'consider',
	'occur',
	'gentle',
	'crush',
	'tasteful',
	'measure',
	'border',
	'moldy',
	'rustic',
	'dust',
	'boundless',
	'aback',
	'stale',
	'deserve',
	'squeak',
	'splendid',
	'side',
	'friend',
	'punishment',
	'colorful',
	'ring',
	'march',
	'concerned',
	'gleaming',
	'inconclusive',
	'tire',
	'brief',
	'zealous',
	'wool',
	'telephone',
	'include',
	'gate',
	'automatic',
	'library',
	'embarrassed',
	'beneficial',
	'tiger',
	'rabbit',
	'chemical',
	'swing',
	'shiver',
	'actor',
	'riddle',
	'hospitable',
	'deserted',
	'hallowed',
	'lacking',
	'advice',
	'wax',
	'loaf',
];

const randomWord = (words) => words[Math.floor(Math.random() * words.length)];
let lives = 9;
let word = randomWord(wordList);
let shownWord = [];
let guesses = [];
for (let i = 0; i < word.length; i++) {
	shownWord.push('_');
}

function setup() {
	toggleDisableKey(false);
	document.querySelector('#status').textContent = 'Click a button to start guessing...';
	document.querySelector('#guessed').textContent = 'Letters Guessed:';
	lives = 9;
	word = randomWord(wordList);
	shownWord = [];
	guesses = [];
	console.log('Reset');
	for (let i = 0; i < word.length; i++) {
		shownWord.push('_');
	}
	document.querySelector('#domWord').textContent = shownWord.join(' ');
	draw(lives);
}

function bttnAttcher() {
	const keys = document.querySelectorAll('.key');
	for (const key of keys) {
		key.addEventListener('click', checkGuess);
	}
	const reset = document.querySelector('#reset-button');
	reset.addEventListener('click', setup);
}

function toggleDisableKey(bool) {
	const keys = document.querySelectorAll('.key');
	for (const key of keys) {
		key.disabled = bool;
	}
}

window.addEventListener('load', () => {
	console.log('hello');

	setup();
	makeKeyboard();
	bttnAttcher();
	document.body.addEventListener('keyup', checkGuess);
});

function makeKeyboard() {
	const keyboard = document.querySelector('#keyboard');
	const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	for (const letter of alpha) {
		const elem = document.createElement('button');
		elem.classList.add('key');
		elem.textContent = letter;
		keyboard.append(elem);
	}
}

function checkGuess(e) {
	let guess;
	if (e.type == 'keyup') {
		guess = e.key;
		const keys = document.querySelectorAll('.key');
		for (const key of keys) {
			if (key.textContent == guess.toUpperCase()) {
				key.disabled = true;
			}
		}
	} else {
		guess = e.target.textContent;
		guess = guess.toLowerCase();
		e.target.disabled = true;
	}
	const status = document.querySelector('#status');
	if (guesses.includes(guess)) {
		status.textContent = `You have already guessed ${guess}!`;
		return;
	}
	if (word.includes(guess)) {
		status.textContent = 'Correct!';
		for (let i = 0; i < word.length; i++) {
			if (word[i] === guess) shownWord[i] = guess;
		}
		guesses.push(guess);
	} else {
		status.textContent = 'Incorrect!';
		lives -= 1;
		draw(lives);
		if (lives <= 0) {
			status.textContent = 'You Lose!';
			toggleDisableKey(true);
		}
		document.querySelector('#guessed').textContent += guess + ' ';
		guesses.push(guess);
	}
	if (!shownWord.includes('_')) {
		status.textContent = 'You Win!';
		toggleDisableKey(true);
	}
	document.querySelector('#domWord').textContent = shownWord.join(' ');
}
