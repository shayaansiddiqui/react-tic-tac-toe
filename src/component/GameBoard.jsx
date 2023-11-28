import {useState} from "react";

const initialGameBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null]
]
const GameBoard = () => {
	const [gameBoard, setGameBoard] = useState(initialGameBoard);
	const handleSelectSquare = (rowIndex, columnIndex) => {
		console.log(rowIndex + " row")
		console.log(columnIndex + " column")
		setGameBoard((prevGameBoard) => {
			console.log(prevGameBoard);
			const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
			updatedBoard[rowIndex][columnIndex] = 'X';
			console.log(updatedBoard);
			return updatedBoard;
		});
	}
	return (
		<ol id={'game-board'}>
			{
				gameBoard.map((row, rowIndex) =>
					<li key={rowIndex}>
						<ol>
							{
								row.map((playerSymbol, columnIndex) =>
									<li key={columnIndex}><button onClick={() => handleSelectSquare(rowIndex, columnIndex)}>{playerSymbol}</button></li>
								)
							}
						</ol>
					</li>
				)
			}
		</ol>
	);
}

export default GameBoard;