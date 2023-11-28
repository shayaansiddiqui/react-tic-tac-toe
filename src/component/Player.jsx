import {useState} from 'react';
const Player = ({name, symbol}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [playerName, setPlayerName] = useState(name);
	const editHandler = () => {
		buttonCaption = 'Save';
		setIsEditing(editing => !editing);
	}

	const playerNameHandler = (e) => {
		if(e.key === 'Enter')
		{
			console.log(e.target.value);
			if(e.target.value.length > 0) {
				setPlayerName(e.target.value);
				setIsEditing(!isEditing);
			}
		}
	}
	let buttonCaption = 'Edit';
	let inputPlayerInfo = <input type={'text'} onKeyDown={playerNameHandler} defaultValue={playerName ?? 'Player 1'} required></input>
	let readOnlyPlayerInfo = <span className={'player-name'}>{playerName}</span>


	return (
		<li>
			<span className={'player'}>
				{isEditing ? inputPlayerInfo : readOnlyPlayerInfo}
				<span className={'player-symbol'}>{symbol}</span>
			</span>
			<button onClick={editHandler}>{isEditing ? 'Save' : 'Edit'}</button>
		</li>
	);
}

export default Player;