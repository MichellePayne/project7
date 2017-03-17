import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import {Router, Route, browserHistory } from 'react-router'
import Goals from './components/Goals';
// import Footer from './components/Footer';
var config = {
	apiKey: "AIzaSyBhzwS50aEF9bRY4OqodwYtjc_31bl2nnA",
	authDomain: "goal-digger.firebaseapp.com",
	databaseURL: "https://goal-digger.firebaseio.com",
	storageBucket: "goal-digger.appspot.com",
	messagingSenderId: "200577966403"
 };
 firebase.initializeApp(config);

class App extends React.Component{
	constructor(){
		super();
		this.state = {
			activeGoals: [],
			setGoal: " ",
			deadline: " "
		}
		this.addGoal = this.addGoal.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	componentDidMount(){
		const dbRef = firebase.database().ref();
		firebase.auth().onAuthStateChanged((user) => {
			if(user) {
				dbRef.on('value', (data) =>{
					const dataBaseData = data.val();
					const activeGoalsArray = [];
					for(let goalKey in dataBaseData) {
						const setGoalKey = dataBaseData[goalKey];
						setGoalKey.key = goalKey;
						activeGoalsArray.push(setGoalKey);
					}
					this.setState({
						activeGoals: activeGoalsArray
					});
				});
			}
		});
	}
	handleChange(e){
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	addGoal(e) {
		e.preventDefault();
		const goal= {
			setGoal: this.state.setGoal,
			deadline: this.state.deadline
		};
		const dbRef = firebase.database().ref();
		dbRef.push(goal);
	}
	removeGoal(goalToRemove) {
		const dbRef= firebase.database().ref(goalToRemove.key);
		dbRef.remove();
	}

	render() {
		return (
			<div>
				<Header />
				<section>
					<form onSubmit={this.addGoal} className="addGoals">
						<label htmlFor="setGoal">Set your goal</label>
						<input type="text" name="setGoal" onChange={this.handleChange}/>
						<label htmlFor="deadline">Deadline for your goal</label>
						<input type="text" name="deadline" onChange={this.handleChange}/>
						<button>Set Goal</button>
					</form>
					<ul className="activeGoals">
						{this.state.activeGoals.map((activeGoal, i) => {
							return <Goals data={activeGoal} remove={this.removeGoal} key={activeGoal.key}  />
					})}
					</ul>
				</section>
			
			</div>
		)
	}
}

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={App} />
		<Route path="/goals" component={Goals} />
	</Router>, document.getElementById('app'));	

