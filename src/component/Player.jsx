import React, {useState} from 'react';

const Player = ({initialName, symbol, isActive}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [playerName, setPlayerName] = useState(initialName);
	let playerNameInput = React.createRef();
	const editHandler = () => {
		buttonCaption = 'Save';
		updatePlayerName(playerNameInput.current?.value);
		setIsEditing(editing => !editing);
	}

	const playerNameHandler = (e) => {
		if (e.key === 'Enter') {
			let name = e.target.value;
			updatePlayerName(name);
			setIsEditing(editing => !editing);
		}
	}

	const updatePlayerName = (desiredName) => {
		if(desiredName === undefined)
			desiredName = 'Player One';
		if(desiredName.length === 0) {
			desiredName = 'Player One';
		}
		setPlayerName(desiredName);
	}

	let buttonCaption = 'Edit';
	let inputPlayerInfo = <input ref={playerNameInput} type={'text'} onKeyDown={playerNameHandler} value={playerName ?? 'Player 1'} required></input>
	let readOnlyPlayerInfo = <span className={'player-name'}>{playerName}</span>


	return (
		<li className={isActive ? 'active' : undefined}>
			<span className={'player'}>
				{isEditing ? inputPlayerInfo : readOnlyPlayerInfo}
				<span className={'player-symbol'}>{symbol}</span>
			</span>
			<button onClick={editHandler}>{isEditing ? 'Save' : 'Edit'}</button>
		</li>
	);
}

export default Player;