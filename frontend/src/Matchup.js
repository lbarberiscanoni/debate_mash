import React, { Component } from 'react';
import axios from "axios";
import Footer from "./Footer";
import Speech from "./Speech";

class Matchup extends Component {

	constructor(props) {
		super(props)
		this.state = {
		}
	}

	componentDidMount() {
	    axios
	      .get("http://localhost:8000/matchup")
	      .then(
	        res => {
	        	let pair = res["data"]
	        	this.setState({ pair })
	        }
	      )
	}

	update(e) {
		let ob = {}
		ob["winner"] = e.target.value == "incumbent" ? this.state.pair.incumbent.path : this.state.pair.challenger.path
		ob["loser"] = e.target.value == "incumbent" ? this.state.pair.challenger.path : this.state.pair.incumbent.path
		ob["user"] = this.props.user
		
		axios
	      .post("http://localhost:8000/matchup", { ob })
	      .then(
	      	res => {
	        	let pair = res["data"]
	        	this.setState({ pair })
	        }
	      )
	}

	render() {
		if (Object.keys(this.state).length < 1) {
			return(
				<div className="preloader-wrapper big active">
					<div className="spinner-layer spinner-blue-only">
						<div className="circle-clipper left">
							<div className="circle"></div>
						</div>
						<div className="gap-patch">
							<div className="circle"></div>
						</div>
						<div className="circle-clipper right">
							<div className="circle"></div>
						</div>
					</div>
				</div>
			)
		} else {
			return(
				<div>
					<h3 className="center-align">Debate Matchups</h3>
					<p className="center-align">Watch both videos and click on the one you liked the most</p>
					<div className="container">
						<div className="row">
							<div className="col s6 m6 l6">
					    		<div className="card">
					    			<div className="card-image">
										<video src={ this.state.pair.incumbent.path } className="responsive-video" controls></video>
					    			</div>
					    			<div className="card-content">
					    				<h5>{ this.state.pair.incumbent.year } { this.state.pair.incumbent.division } Finals</h5>
					    			</div>
									<div className="card-action">
										<button className="btn-large" value={ "incumbent" } onClick={ this.update.bind(this) }>
											This one is better
										</button>
									</div>
					    		</div>
							</div>
							<div className="col s6 m6 l6">
					    		<div className="card">
					    			<div className="card-image">
										<video src={ this.state.pair.challenger.path } className="responsive-video" controls></video>
					    			</div>
					    			<div className="card-content">
					    				<h5>{ this.state.pair.challenger.year } { this.state.pair.challenger.division } Finals</h5>
					    			</div>
									<div className="card-action">
										<button className="btn-large" value={ "challenger" } onClick={ this.update.bind(this) }>
											This one is better
										</button>
									</div>
					    		</div>	
							</div>
						</div>
					</div>
					<Footer />
				</div> 
			)	
		}	
	}
}

export default Matchup;