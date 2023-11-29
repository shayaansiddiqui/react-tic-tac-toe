import Player from "./component/Player.jsx";
import GameBoard from "./component/GameBoard.jsx";
import {useState} from "react";
import Log from "./component/Log.jsx";
import {WINNING_COMBINATIONS} from "./winning-combinations.js";
import GameOver from "./component/GameOver.jsx";

const PLAYERS = {
	X: 'Player 1',
	O: 'Player 2'
};

const INITIAL_GAME_BOARD = [
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

const derivedWinner = (gameBoard, players) => {
	let winner = null;

	for(const combination of WINNING_COMBINATIONS) {
		const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
		const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
		const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

		if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol)
		{
			// Won game
			winner = players[firstSquareSymbol];
		}
	}
	return winner;
}

const derivedGameBoard = (gameTurns) => {
	let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];
	for(const turn of gameTurns) {
		const { square, player } = turn;
		const { row, column } = square;
		gameBoard[row][column] = player;
	}
	return gameBoard;
}

function App() {
	const [players,setPlayers] = useState(PLAYERS);
	const [gameTurns, setGameTurns] = useState([]);
	const activePlayer = derivedActivePlayer(gameTurns);

	let gameBoard = derivedGameBoard(gameTurns);

	const winner = derivedWinner(gameBoard, players);

	const hasDraw = gameTurns.length === 9 && !winner;

	const handleRestart = () => {
		setGameTurns([]);
	}
	const handleSelectSquare = (rowIndex, columnIndex) => {
		setGameTurns(prevTurns => {
			let currentPlayer = derivedActivePlayer(gameTurns);
			return [
				{square: {row: rowIndex, column: columnIndex}, player: currentPlayer},
				...prevTurns];
		});
	}

	const handlePlayerNameChange = (symbol, newName) => {
		setPlayers(prevPlayers => {
			return {
				...prevPlayers,
				[symbol]: newName
			}
		});
	}

	return (
		<main>
			<div id={'game-container'}>
				<ol id={'players'} className={'highlight-player'}>
					<Player initialName={PLAYERS.X} symbol={'X'} isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange}/>
					<Player initialName={PLAYERS.O} symbol={'O'} isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange}/>
				</ol>
				{(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
				<GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
			</div>
			<Log turns={gameTurns}/>
		</main>
	)
}

export default App
