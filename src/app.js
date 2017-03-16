import React from 'react';
import ReactDOM from 'react-dom';
// import Header from './components/Header';
// import Goals from './components/Goals';
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

	render(){
		return(
			<div>
				
				<section>
					<form className="signUp">
						<label htmlFor="Name">Name</label>
						<input type="text" name="name"/>
						<label htmlFor="Email">Email</label>
						<input type="email" name="email"/>
						<label htmlFor="Password">Password</label>
						<input type="password" name="password"/>
						<button>Sign Up</button>
					</form>
					<form className="signIn">
						<label htmlFor="Name">Name</label>
						<input type="text" name="name"/>
						<label htmlFor="Password">Password</label>
						<input type="password" name="password"/>
						<button>Sign In</button>
					</form>
					<form className="goals">
						<label htmlFor="Goal">Set your goal</label>
						<input type="text" name="goal"/>
						<label htmlFor="deadline">Deadline for your goal</label>
						<input type="email" name="email"/>
						<button>Set Goal</button>
					</form>
					<ul className="activeGoals">
					</ul>
				</section>
			
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById("app"));
