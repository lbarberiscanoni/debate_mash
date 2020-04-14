import React, { Component } from 'react';
import axios from "axios";
import Footer from "./Footer";
import Speech from "./Speech";

class Ranking extends Component {

	constructor(props) {
		super(props)
		this.state = {
			"speeches": [],
			"starting_point": 0
		}
	}

	componentDidMount() {
	    axios
	      .get("http://localhost:8000/ranking")
	      .then(
	        res => this.setState({"speeches": res["data"]["data"]})
	      )
	}

	render() {
		let window_size = 30

		let components = []

		let beginning = this.state.starting_point
		let end = beginning + window_size

		let speech_window = this.state.speeches.slice(beginning, end)
		let i = 0
		speech_window.map((speech) => {
			let component = <Speech key={ i } rank={ i } path={ speech.path } speaker={ speech.speaker } division={ speech.division } year={ speech.year } score={ speech.score } />
			components.push(component)
			i += 1
		})

		return(
          <div>
            <div className="row">
            	{ components }
            </div>
            <Footer />
          </div>   
		)		
	}
}

export default Ranking;