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
	toggleDisableKeys(false);
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
		key.addEventListener('click', buttonEvent);
	}
	const reset = document.querySelector('#reset-button');
	reset.addEventListener('click', setup);
}

function toggleDisableKeys(bool) {
	const keys = document.querySelectorAll('.key');
	for (const key of keys) {
		key.disabled = bool;
	}
}

window.addEventListener('load', () => {
	setup();
	makeKeyboard();
	bttnAttcher();
	document.body.addEventListener('keyup', keyupEvent);
});

//make the on screen keyboard when page is loaded
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
function keyupEvent(e) {
	const keys = document.querySelectorAll('.key');
	for (const key of keys) {
		if (key.textContent == e.key.toUpperCase()) {
			key.disabled = true;
		}
	}
	checkGuess(e.key);
}

function buttonEvent(e) {
	e.target.disabled = true;
	console.log('hi');
	checkGuess(e.target.textContent.toLowerCase());
}

function checkGuess(letter) {
	//Check if a key from the computer keyboard has been clicked instead of the on screen
	const status = document.querySelector('#status');
	if (guesses.includes(letter)) {
		status.textContent = `You have already guessed ${letter}!`;
		return;
	}
	if (word.includes(letter)) {
		status.textContent = 'Correct!';
		for (let i = 0; i < word.length; i++) {
			if (word[i] === letter) shownWord[i] = letter;
		}
		guesses.push(letter);
	} else {
		status.textContent = 'Incorrect!';
		lives -= 1;
		draw(lives);
		if (lives <= 0) {
			status.textContent = 'You Lose!';
			toggleDisableKeys(true);
		}
		document.querySelector('#guessed').textContent += letter + ' ';
		guesses.push(letter);
	}
	if (!shownWord.includes('_')) {
		status.textContent = 'You Win!';
		toggleDisableKeys(true);
	}
	document.querySelector('#domWord').textContent = shownWord.join(' ');
}
