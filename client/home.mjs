import { loadHangman } from './loadHangman.mjs';

function draw(canvas) {
	const context = canvas.getContext('2d');
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.lineWidth = 10;
	context.beginPath();
	context.moveTo(175, 225);
	context.lineTo(5, 225);
	context.moveTo(40, 225);
	context.lineTo(25, 5);
	context.lineTo(100, 5);
	context.lineTo(100, 25);
	context.stroke();
	context.lineWidth = 5;
	context.beginPath();
	context.arc(100, 50, 25, 0, Math.PI * 2, true);
	context.closePath();
	context.stroke();

	context.beginPath();
	context.moveTo(100, 75);
	context.lineTo(100, 140);
	context.stroke();

	context.beginPath();
	context.moveTo(100, 85);
	context.lineTo(60, 100);
	context.stroke();

	context.beginPath();
	context.moveTo(100, 85);
	context.lineTo(140, 100);
	context.stroke();

	context.beginPath();
	context.moveTo(100, 140);
	context.lineTo(80, 190);
	context.stroke();

	context.beginPath();
	context.moveTo(82, 190);
	context.lineTo(70, 185);
	context.stroke();

	context.beginPath();
	context.moveTo(100, 140);
	context.lineTo(125, 190);
	context.stroke();

	context.beginPath();
	context.moveTo(122, 190);
	context.lineTo(135, 185);
	context.stroke();
}

export function home() {
	document.body.innerHTML = '';
	const h1 = document.createElement('h1');
	h1.textContent = 'Hangman';
	h1.id = 'home-h1';
	document.body.append(h1);
	const canvas = document.createElement('canvas');
	canvas.id = 'Hangman';
	canvas.width = 180;
	canvas.height = 250;
	document.body.append(canvas);
	draw(canvas);
	const nav = document.createElement('nav');
	nav.id = 'nav-list';
	document.body.append(nav);
	const play = document.createElement('button');
	play.textContent = 'Play';
	play.addEventListener('click', loadHangman);
	nav.append(play);
	const div = document.createElement('div');
	div.id = 'container';
	nav.append(div);
	const ul = document.createElement('ul');
	div.append(ul);
	const li = document.createElement('li');
	ul.append(li);
	const local = document.createElement('button');
	local.textContent = 'Vs Local';
	local.addEventListener('click', loadHangman);
	li.append(local);
	const online = document.createElement('button');
	online.textContent = 'Vs Online';
	online.addEventListener('click', loadHangman);
	li.append(online);
	const css = document.querySelector('#css');
	css.href = 'style.css';
}
