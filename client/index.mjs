// const prompt = require('prompt-sync')({ sigint: true });
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
	document.getElementById('status').textContent = 'Click a button to start guessing...';
	document.getElementById('guessed').textContent = 'Letters Guessed:';
	lives = 9;
	word = randomWord(wordList);
	shownWord = [];
	guesses = [];
	console.log('Reset');
	for (let i = 0; i < word.length; i++) {
		shownWord.push('_');
	}
	document.getElementById('domWord').textContent = shownWord.join(' ');
	draw(lives);
}

function bttnAttcher() {
	const keys = document.getElementsByClassName('key');
	for (const key of keys) {
		key.addEventListener('click', checkGuess);
	}
	const reset = document.getElementById('reset-button');
	reset.addEventListener('click', setup);
}

function toggleDisableKey(bool) {
	const keys = document.getElementsByClassName('key');
	for (const key of keys) {
		key.disabled = bool;
	}
}

window.addEventListener('load', () => {
	setup();
	bttnAttcher();
});

function checkGuess(e) {
	const status = document.getElementById('status');
	let guess = e.target.textContent;
	guess = guess.toLowerCase();
	e.target.disabled = true;
	if (word.includes(guess)) {
		status.textContent = 'Correct!';
		for (let i = 0; i < word.length; i++) {
			if (word[i] === guess) shownWord[i] = guess;
		}
		guesses.push(guess);
	} else {
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
			document.getElementById('guessed').textContent += guess + ' ';
			guesses.push(guess);
		}
	}
	if (!shownWord.includes('_')) {
		status.textContent = 'You Win!';
		toggleDisableKey(true);
	}
	document.getElementById('domWord').textContent = shownWord.join(' ');
}
