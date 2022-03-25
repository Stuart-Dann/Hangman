import { home } from './home.mjs';
import { hangmanloaded } from './hangman.mjs';

export function loadHangman() {
	const styleLink = document.querySelector('#css');
	styleLink.href = 'hangman.css';
	const body = document.body;
	body.innerHTML = '';

	//Create div: Screen-cover
	let div = document.createElement('div');
	div.id = 'screen-cover';
	body.append(div);

	//Create Header button
	let button = document.createElement('button');
	button.id = 'header';
	button.addEventListener('click', home);
	button.textContent = 'Hangman';
	body.append(button);

	//Create a Spacer between Header and canvas
	let p = document.createElement('p');
	p.id = 'spacer';
	body.append(p);

	//Create Hangman canvas
	const canvas = document.createElement('canvas');
	canvas.id = 'hangman';
	canvas.width = 180;
	canvas.height = 250;
	body.append(canvas);

	//Create domWord
	p = document.createElement('p');
	p.id = 'domWord';
	body.append(p);

	//Create guessed element
	p = document.createElement('p');
	p.id = 'guessed';
	p.textContent = 'Letters Guessed: ';
	body.append(p);

	//Create keyboard Div
	div = document.createElement('div');
	div.id = 'keyboard';
	body.append(div);

	//Create status p
	p = document.createElement('p');
	p.id = 'status';
	p.textContent = 'Click a button to start guessing...';
	body.append(p);

	//Create reset-text 'click'
	const click = document.createElement('p');
	click.className = 'reset-text';
	click.textContent = 'Click ';

	//Create reset-button
	button = document.createElement('button');
	button.id = 'reset-button';
	button.textContent = 'reset';

	//Create list for p and reset button
	const ul = document.createElement('ul');
	body.append(ul);
	let li = document.createElement('li');
	li.append(click);
	ul.append(li);
	li = document.createElement('li');
	li.append(button);
	ul.append(li);
	const restOfResetText = document.createElement('p');
	restOfResetText.className = 'reset-text';
	restOfResetText.textContent = ' to reset the game and generate a new word!';
	li = document.createElement('li');
	li.append(restOfResetText);
	ul.append(li);
	hangmanloaded();
}
