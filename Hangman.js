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

const randomWord = (words) => words[Math.floor(Math.random() * words.length + 1)];
const word = randomWord(wordList);
let guesses = [];

function hrFormatter() {
	console.log(word);
	for (let i = 0; i < word.length; i++) {
		const column = document.createElement('div');
		column.className = 'column';
		const line = document.createElement('hr');
		const p = document.createElement('p');
		p.textContent = '.';
		p.id = 'char ' + i;
		column.append(p, line);
		const row = document.querySelector('.row');
		row.append(column);
	}
	const elements = document.getElementsByClassName('column');
	for (let i = 0; i < elements.length; i++) {
		elements[i].style.width = 100 / (word.length + 1) + '%';
		elements[i].style.padding = 2 + 'px';
	}
}

function checkGuess() {
	const guess = document.getElementById('letter').value;
	if (word.includes(guess) && !guesses.includes(guess)) {
		displayLetter(guess);
		const domGuess = document.getElementById('domGuess');
		domGuess.textContent += guess + ',';
	} else {
		const lives = document.getElementById('lives');
		domGuess.textContent += guess + ',';
		if (lives.textContent == '') {
			lives.textContent = 'You Lose!';
		} else {
			lives.textContent = '/'.repeat(9 - guesses.length);
		}
	}
	guesses.push(guess);
}
function displayLetter(guess) {
	const wordArray = Array.from(word);
	const indicies = [];
	wordArray.forEach((element, index) => {
		if (element.includes(guess)) {
			indicies.push(index);
		}
	});
	for (let i = 0; i < indicies.length; i++) {
		let p = document.getElementById('char ' + indicies[i]);
		p.textContent = wordArray[indicies[i]];
	}
}
