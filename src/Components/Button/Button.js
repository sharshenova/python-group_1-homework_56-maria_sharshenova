import React from 'react';

function Button (props) {

    return (
    	<div className="Button-container">
    		<button className='btn Button' onClick={props.resetGame}>Reset</button>
    	</div>
    )
}

export default Button;