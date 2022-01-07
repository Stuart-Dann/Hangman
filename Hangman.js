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

const setup = () => {
	document.getElementById('domWord').textContent = domArray.join(' ');
};
document.addEventListener('keyup', keyID);

window.addEventListener('load', setup);

function keyID(e) {
	let key = e.code;
	key = key.substr(3).toLowerCase();
	checkGuess(key);
	console.log(key);
}

function checkGuess(guess) {
	guess = guess.toLowerCase();
	if (word.includes(guess)) {
		document.getElementById('status').textContent = 'Correct!';
		let indices = [];
		for (let i = 0; i < word.length; i++) {
			if (word[i] === guess) indices.push(i);
		}
		for (let i = 0; i < indices.length; i++) {
			domArray[indices[i]] = word[indices[i]];
		}
		guesses.push(guess);
	} else {
		if (guesses.includes(guess)) {
			document.getElementById('status').textContent = "You've already guessed that!";
		} else {
			document.getElementById('status').textContent = 'Incorrect!';
			lives -= 1;
			if (lives <= 0) {
				document.getElementById('status').textContent = 'You Lose!';
			}
			document.getElementById('guessed').textContent += guess + ' ';
			guesses.push(guess);
		}
	}
	setup();
}
