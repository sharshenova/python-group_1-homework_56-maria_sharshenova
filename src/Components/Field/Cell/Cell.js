import React from 'react';

function Cell (props) {
	// собираем строку, представляющую классы ячейки
	let cellClass = 'Cell';
	if (props.cell.open) cellClass += ' Open';
	if (props.cell.hasItem) cellClass += ' Has-item';
	

    return <div className={cellClass} onClick={props.click}/>;
}

export default Cell;