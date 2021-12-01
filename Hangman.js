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
function checkLetter(guess) {
	if (guesses.includes(guess)) {
		document.getElementById('result').innerHTML = 'You have already guessed that!';
	} else if (word.includes(guess)) {
		document.getElementById('result').innerHTML = guess + ' is in the word!';
		document.getElementById('lettersContained').textContent += guess + ',';
		guesses.push(guess);
	} else {
		document.getElementById('result').innerHTML = guess + ' is not in the word';
		document.getElementById('!lettersContained').textContent += guess;
		guesses.push(guess);
	}
}
