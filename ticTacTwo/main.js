/*
To do: 
X Highlight winning squares
X Deactivate remaining squares after win
X Increment win counter after win
X Implement alert for tie game
X Implement first player switching
X Implement total game counter
XImprove turn indicator
\Improve styles (I'm giving that half an X, it's still not exactly pretty but it's a lot less ugly...)
Prevent double points for two-line win?


*/
// var board = document.querySelector('.board');
var sideX = document.querySelector('.side.x');
var sideO = document.querySelector('.side.o');

var scores = {
	x: {
		node: document.getElementById('x-score'),
		wins: 0
	},
	o: {
		node: document.getElementById('o-score'),
		wins: 0
	}
};

// var sides = {
// 	x: {
// 		score: document.getElementById('x-score'),
// 		side: document.querySelector('.side.x')
// 	},
// 	o: {
// 		score: document.getElementById('o-score'),
// 		side: document.querySelector('.side.o')
// 	}
// };

var newGameButton = document.getElementById('new-game');


var numGames = 0;
var numGameNode = document.getElementById('num-games');

var currentTurn;

var combos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

// var gridTracker = {
// 	x: [0, 0, 0, 0, 0, 0, 0, 0, 0],
// 	o: [0, 0, 0, 0, 0, 0, 0, 0, 0]
// };

var boardState;
var gameWon;
var gameTie;

var checkForCombo = function(combo) {
	// var cl = gridTracker[currentTurn];
	// if (!!cl[combo[0]] && !!cl[combo[1]] && !!cl[combo[2]]) {
	// 	alert(currentTurn + ' wins');
	// }
	if (boardState[combo[0]] === currentTurn && boardState[combo[1]] === currentTurn && boardState[combo[2]] === currentTurn) {
		alert(currentTurn + ' wins');
		combo.forEach(function(number) {
			document.getElementById(number).classList.add('winning');
		});
		gameWon = true;
	}
};

var checkForTie = function() {
	if (boardState.indexOf(0) < 0) {
		gameTie = true;
		return gameTie;
	}
};

var squareClick = function(event) {
	event.target.classList.add(currentTurn);
	event.target.classList.remove('open');
	event.target.textContent = currentTurn;

	// gridTracker[currentTurn][parseInt(event.target.id)] = currentTurn;
	boardState[parseInt(event.target.id)] = currentTurn;
	// console.log(boardState);
	event.target.removeEventListener('click', squareClick);
	combos.forEach(checkForCombo);
	if (gameWon) {
		// sides[currentTurn].score.textContent = parseInt(sides[currentTurn].score.textContent) + 1;
		scores[currentTurn].wins++
		scores[currentTurn].node.textContent = scores[currentTurn].wins;
		numGames++;
		numGameNode.textContent = numGames;
		boardState.forEach(function(squareState, index) {
			if (!squareState) {
				var square = document.getElementById(index);
				square.removeEventListener('click', squareClick);
				square.classList.remove('open');
			}
		});
	} else if (checkForTie()) {
		alert('Tie game');
		numGames++;
		numGameNode.textContent = numGames;
	} else {
		sideX.classList.toggle('active');
		sideO.classList.toggle('active');
		currentTurn = (currentTurn === 'x' ? 'o' : 'x');
	}
};

var startGame = function() {
	if (numGames % 2 === 0) {
		currentTurn = 'x';
		sideX.classList.add('active');
		sideO.classList.remove('active');
	} else {
		currentTurn = 'o';
		sideO.classList.add('active');
		sideX.classList.remove('active');
	}
	boardState = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	gameWon = false;
	gameTie = false;

	for (var i=0; i<=8; i++) {
		var square = document.getElementById(i);
		square.classList.remove('x');
		square.classList.remove('o');
		square.classList.remove('winning');
		square.classList.add('open');
		// square.className = 'open square';
		square.textContent = '';
		square.addEventListener('click', squareClick);
	}
};

startGame();

newGameButton.addEventListener('click', startGame);