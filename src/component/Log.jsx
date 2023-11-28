const Log = ({turns}) => {
	return (
		<ol id={'log'}>
			{turns.map((logItem, logIndex) =>
				<li key={`${logItem.square.row}${logItem.square.column}`}>{logItem.player} selected {logItem.square.row},{logItem.square.column}</li>
			)}

		</ol>
	);
}

export default Log;