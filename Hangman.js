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
// randomWord(wordList)
let domArray = [];
let guesses = [];
let lives = 9;
for (let i = 0; i < word.length; i++) {
	domArray.push('_');
}

const setUp = () => {
	document.getElementById('domWord').textContent = domArray.join(' ');
};

function checkGuess() {
	const guess = document.getElementById('letter').value;
	if (word.includes(guess)) {
		let indices = [];
		for (let i = 0; i < word.length; i++) {
			if (word[i] === guess) indices.push(i);
		}
		for (let i = 0; i < indices.length; i++) {
			domArray[indices[i]] = word[indices[i]];
		}
		guesses.push(guess);
	}
	guesses.push(guess);
	setUp();
}
