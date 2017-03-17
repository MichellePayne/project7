import React from 'react';

export default function Goals(props) {
	return(
		<li className="crushedGoals">{props.data.setGoal} by {props.data.deadline}
		<button onClick={() => props.remove(props.data)}>Crushed It</button></li>
		)
}