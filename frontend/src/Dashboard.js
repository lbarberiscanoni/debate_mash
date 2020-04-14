import React, { Component } from 'react';
import axios from "axios";
import Footer from "./Footer";
import Speech from "./Speech";

class Dashboard extends Component {

	constructor(props) {
		super(props)
		this.state = {
			"top_users": [],
			"latest_users": [],
		}
	}

	componentDidMount() {
		axios
			.get("http://localhost:8000/top")
			.then(
				res => {
					this.setState({
						"top_users": res["data"]["top_users"],
						"latest_users": res["data"]["latest_users"]
					})
				}
			)
	}

	render() {
		return(
          <div className="container">
          	<h1 className="center-align">Welcome to Debate Match</h1>
          	<div className="row">
	            <div className="col s5 m5 l5">
	            	<h3>Leaderboard</h3>
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th># of Speeches Watched</th>
							</tr>
						</thead>

						<tbody>
				          	{ 
			            		this.state.top_users.map((x) => {
			            			return <tr><td>{ x.name }</td><td>{ x.num_records }</td></tr>
			            		})
			            	}					
						</tbody>
					</table>
	            </div>
	            <div className="col s2 m2 l2">
	            </div>
	            <div className="col s5 m5 l5">
	            	<h3>Latest Activity</h3>
	            	{ 
	            		this.state.latest_users.map((x) => {
	            			return <h5>{ x.name } watched { x.speech }</h5>
	            		})
	            	}
	            </div>
	        </div>
            <Footer />
          </div>   
		)		
	}
}

export default Dashboard;