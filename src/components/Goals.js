import React from 'react';

export default function Goals(props) {
	console.log(props.data);
	return(<li className="crushedGoals">{props.data.setGoal} - {props.data.deadline}
		<button onClick={() => props.remove(props.data)}>Crushed It</button></li>
		)
}