import React, { Component } from 'react';
import axios from "axios";
import Footer from "./Footer";
import Speech from "./Speech";

class Profile extends Component {

	constructor(props) {
		super(props)
		this.state = {
			"view_history": []
		}
	}

	signup() {
	    let ob = {}
	    ob["user"] = document.getElementById("username_signup").value
	    ob["password"] = document.getElementById("pass_signup").value

	    this.props.auth(ob, "signup")
	}

	login() {
	    let ob = {}
	    ob["user"] = document.getElementById("username_login").value
	    ob["password"] = document.getElementById("pass_login").value

	    this.props.auth(ob, "login")
	}

	componentDidMount() {
		let ob = {}
		let userId = this.props.user
		ob["id"] = userId
		axios
			.post("http://localhost:8000/profile", { ob })
	      	.then(
		        res => {
		          this.setState({
		          	"view_history": res["data"]["data"]
		          })
		        }
      		)     
	}

	render() {
		if (this.props.user == "anon") {
			return(
				<div className="container">
		            <h1 className="center-align">Welcome to Debate Match</h1>
		            <div className="row">
		              <div className="col s6 m6 l6">
		              	<h5>Sign up</h5>
		                <div className="input-field col s12">
		                  <input placeholder="full name no spaces" id="username_signup" type="text" className="validate" />
		                  <label for="first_name">Username</label>
		                </div>
		                <div className="input-field col s12">
		                  <input placeholder="your password" id="pass_signup" type="text" className="validate" />
		                  <label for="first_name">Password</label>
		                </div>
		                <div className="col s12">
		                  <button className="btn" onClick={ this.signup.bind(this) } >Signup</button>
		                </div>
		              </div>
		              <div className="col s2 m2 l2">
		                <div className="row"></div>
		                <div className="row"></div>
		                <div className="row"></div>
		                <div className="row">
		                  <h5>OR</h5>
		                </div>
		              </div>
		              <div className="col s4 m4 l4">
		                <h5>Login</h5>
		                <div className="input-field col s12">
		                  <input placeholder="full name no spaces" id="username_login" type="text" className="validate" />
		                  <label for="first_name">Username</label>
		                </div>
		                <div className="input-field col s12">
		                  <input placeholder="the password I gave you" id="pass_login" type="text" className="validate" />
		                  <label for="first_name">Password</label>
		                </div>
		                <div className="col s12">
		                  <button className="btn" onClick={ this.login.bind(this) } >Login</button>
		                </div>
		              </div>
		            </div>
		            <Footer />
		        </div>
	        )
		} else {
			let components = []
			let history = this.state.view_history
			console.log(history)
			history.map((speech) => {
				let component = <div className="row"><div className="col s6 m6 l6"><div className="card"><div className="card-image"><video src={ speech.path } className="responsive-video" controls></video></div><div className="card-content"><h5>{ speech.year } { speech.division } Finals</h5></div></div></div></div>
				components.push(component)
			})
			components.reverse()
			return(
	          <div>
	          	<div className="row">
	          		<h2 className="center-align">You have watched { this.state.speech_count } speeches</h2>
	          		<h4 className="center-align">User Rank # { this.state.user_rank } </h4>
	          	</div>
	            <div className="row">
	            	<div className="col s6 m6 l6">
	            		<h5 className="center-align">Saved</h5>
	            	</div>
	            	<div className="col s6 m6 l6">
	            		<h5 className="center-align">History</h5>

	            		{
	            			components
	            		}
	            	</div>
	            </div>
	            <Footer />
	          </div>   
			)		
		}
	}
}

export default Profile;