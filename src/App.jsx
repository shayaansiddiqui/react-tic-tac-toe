import Player from "./component/Player.jsx";
import GameBoard from "./component/GameBoard.jsx";
import {useState} from "react";
import Log from "./component/Log.jsx";
import {WINNING_COMBINATIONS} from "./winning-combinations.js";

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
				<GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns}/>
			</div>
			<Log turns={gameTurns}/>
		</main>
	)
}

export default App
