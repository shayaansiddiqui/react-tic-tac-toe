import Player from "./component/Player.jsx";
import GameBoard from "./component/GameBoard.jsx";
import {useState} from "react";
import Log from "./component/Log.jsx";
import {WINNING_COMBINATIONS} from "./winning-combinations.js";
import GameOver from "./component/GameOver.jsx";

const initialGameBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null]
]

const derivedActivePlayer = (gameTurns) => {
	let currentPlayer = 'X';
	if(gameTurns.length > 0 && gameTurns[0].player === 'X')
	{
		currentPlayer = 'O';
	}
	return currentPlayer;
}

function App() {
	const [gameTurns, setGameTurns] = useState([]);

	const activePlayer = derivedActivePlayer(gameTurns);

	let gameBoard = initialGameBoard;
	for(const turn of gameTurns) {
		const { square, player } = turn;
		const { row, column } = square;
		gameBoard[row][column] = player;
	}

	let winner = null;

	for(const combination of WINNING_COMBINATIONS) {
		const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
		const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
		const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

		if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol)
		{
			// Won game
			winner = firstSquareSymbol;
		}
	}
	const handleSelectSquare = (rowIndex, columnIndex) => {
		setGameTurns(prevTurns => {
			let currentPlayer = derivedActivePlayer(gameTurns);
			return [
				{square: {row: rowIndex, column: columnIndex}, player: currentPlayer},
				...prevTurns];
		});
	}

	return (
		<main>
			<div id={'game-container'}>
				<ol id={'players'} className={'highlight-player'}>
					<Player initialName={'Player 1'} symbol={'X'} isActive={activePlayer === 'X'}/>
					<Player initialName={'Player 2'} symbol={'O'} isActive={activePlayer === 'O'}/>
				</ol>
				{winner && <GameOver />}
				<GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
			</div>
			<Log turns={gameTurns}/>
		</main>
	)
}

export default App
