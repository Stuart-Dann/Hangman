// const prompt = require('prompt-sync')({ sigint: true });

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
	document.getElementById('status').textContent = '';
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

function draw(lives) {
	const canvas = document.getElementById('hangman');
	const context = canvas.getContext('2d');
	switch (lives) {
		case 9:
			context.clearRect(0, 0, canvas.width, canvas.height);
			break;
		case 8:
			// what does stroke style do and why is it here and not in the other cases?
			context.strokeStyle = '#444';
			context.lineWidth = 10;
			context.beginPath();
			context.moveTo(175, 225);
			context.lineTo(5, 225);
			context.moveTo(40, 225);
			context.lineTo(25, 5);
			context.lineTo(100, 5);
			context.lineTo(100, 25);
			context.stroke();
			break;

		case 7:
			context.lineWidth = 5;
			context.beginPath();
			context.arc(100, 50, 25, 0, Math.PI * 2, true);
			context.closePath();
			context.stroke();
			break;

		case 6:
			context.beginPath();
			context.moveTo(100, 75);
			context.lineTo(100, 140);
			context.stroke();
			break;

		case 5:
			context.beginPath();
			context.moveTo(100, 85);
			context.lineTo(60, 100);
			context.stroke();
			break;

		case 4:
			context.beginPath();
			context.moveTo(100, 85);
			context.lineTo(140, 100);
			context.stroke();
			break;

		case 3:
			context.beginPath();
			context.moveTo(100, 140);
			context.lineTo(80, 190);
			context.stroke();
			break;

		case 2:
			context.beginPath();
			context.moveTo(82, 190);
			context.lineTo(70, 185);
			context.stroke();
			break;

		case 1:
			context.beginPath();
			context.moveTo(100, 140);
			context.lineTo(125, 190);
			context.stroke();
			break;

		case 0:
			context.beginPath();
			context.moveTo(122, 190);
			context.lineTo(135, 185);
			context.stroke();
			break;
	}
}
