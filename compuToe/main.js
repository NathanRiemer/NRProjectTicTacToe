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


Computer player
X Random moves
*/


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

var newGameButton = document.getElementById('new-game');
var numGames = 0;
var numGameNode = document.getElementById('num-games');
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

var currentTurn;
var boardState;
var gameWon;
var gameTie;

//I got this from the MDN documentation for Math.random
//What's the functional difference between declaring a named function
//like this and declaring a variable for an anonymous function?
//This seems more elegant to me, is there a downside?

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var checkForCombo = function(combo) {
	if (boardState[combo[0]] === currentTurn && boardState[combo[1]] === currentTurn && boardState[combo[2]] === currentTurn) {
		combo.forEach(function(number) {
			document.getElementById(number).classList.add('winning');
		});
		alert(currentTurn + ' wins');
		gameWon = true;
	}
};

var checkForTie = function() {
	if (boardState.indexOf(0) < 0) {
		gameTie = true;
		return gameTie;
	}
};

var computerMove = function() {
	var availableSquares = boardState.map(function(value, index) {
		if (value === 0) {
			return index;
		} else {
			return null;
		}
	}).filter(function(value) {
		if (value !== null) {
			return true;
		}
	});
	var random = getRandomInt(0, availableSquares.length);
	var targetSquare = document.getElementById(availableSquares[random]);
	selectSquare(targetSquare);

};

var squareClick = function(event) {
	var targetSquare = event.target;
	selectSquare(targetSquare);
	if (!gameTie && !gameWon) {
		computerMove();
	}
};

var selectSquare = function(targetSquare) {
	targetSquare.classList.add(currentTurn);
	targetSquare.classList.remove('open');
	targetSquare.textContent = currentTurn;
	boardState[parseInt(targetSquare.id)] = currentTurn;
	targetSquare.removeEventListener('click', squareClick);
	combos.forEach(checkForCombo);
	if (gameWon) {
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
		square.textContent = '';
		square.addEventListener('click', squareClick);
	}
	if (currentTurn === 'o') {
		computerMove();
	}
};

startGame();

newGameButton.addEventListener('click', startGame);