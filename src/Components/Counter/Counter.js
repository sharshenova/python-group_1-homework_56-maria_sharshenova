import React from 'react';

function Counter (props) {

    return (
    	<div className="Counter">
    		<p>Count: {props.counter}</p>
    	</div>
    )
}

export default Counter;