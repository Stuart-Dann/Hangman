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
function underScoreFormatter() {
	for (let i = 0; i < word.length; i++) {
		const column = document.createElement('div');
		column.className = 'column';
		const line = document.createElement('hr');
		column.append(line);
		const row = document.querySelector('.row');
		row.append(column);
	}
	const elements = document.getElementsByClassName('column');
	for (let i = 0; i < elements.length; i++) {
		elements[i].style.width = 100 / word.length + '%';
		elements[i].style.padding = 1 + '%';
	}
}
