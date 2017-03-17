import React from 'react';

export default class Header extends React.Component{
	constructor() {
		super();
		this.state = {
			formToShow: "",
			name: "",
			email: "",
			password: "",
			confirm: ""
		};
		this.formToShow = this.formToShow.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.signup = this.signup.bind(this);
		this.login = this.login.bind(this);
		this.signout = this.signout.bind(this);
	}
	formToShow(e) {
		e.preventDefault();
		this.setState({
			formToShow: e.target.className
		})
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	signout(e) {
		e.preventDefault();
		firebase.auth().signOut().then(function(success) {
			console.log('logged out');
		},function(error) {
			console.log(error);
		});
	}
	signup(e) {
		e.preventDefault();
		if(this.state.password === this.state.confirm) {
			firebase.auth()
				.createUserWithEmailAndPassword(this.state.email,this.state.password)
				.then((userData)=> {
				});
		}
	}
	login(e) {
		e.preventDefault();
		const email =this.state.email;
		const password = this.state.password;
		firebase.auth()
			.signInWithEmailAndPassword(email, password)
			.then((success)=> {
				console.log(`logged in as ${success.email}`);
			}),(error) => {
				console.log(error);
			}
		
	}	
	
	render() {
		let loginForm = "";
		if(this.state.formToShow === "signup" ) {
			loginForm = (
				<form onSubmit={this.signup} className="user-form">
					<label htmlFor="name">Name</label>
					<input type="text" name="name" onChange={this.handleChange}/>
					<label htmlFor="email">Email</label>
					<input type="email" name="email" onChange={this.handleChange}/>
					<label htmlFor="password">Password</label>
					<input type="password" name="password" onChange={this.handleChange}/>
					<label htmlFor="confirm">Confirm Password</label>
					<input type="password" name="confirm" onChange={this.handleChange} />
					<button>Sign Up</button>
				</form>
			)
		} else if(this.state.formToShow === "login") {
			loginForm = (
				<form onSubmit={this.login} className="user-form">
					<label htmlFor="email">Email</label>
					<input type="email" name="email" onChange={this.handleChange}/>
					<label htmlFor="password">Password</label>
					<input type="password" name="password" onChange={this.handleChange}/>
					<button>Sign In</button>
				</form>
			)
		}
		return (
			<div>
				<header>
					<h1> Goal Digger </h1>
					<nav>
						<ul>
							<li><a href="" className="signup" onClick={this.formToShow}>Sign Up</a></li>
							<li><a href="" className="login" onClick={this.formToShow}>Log In</a></li>
							<li><a href="" className="signout" onClick={this.signout}>Log Out</a></li>
						</ul>
					</nav>
				</header>
				{loginForm}
			</div>
		)
	}
}
