import React, { Component } from 'react';

class Speech extends Component {

	render() {
		return(
			<div className="row">
				<div className="col s3 m3 l3"></div>
				<div className="col s4 m4 l4">
					<video className="responsive-video" controls>
						<source src={ this.props.path } type="video/mp4"></source>
					</video>
				</div>
				<div className="col s2 m2 l2">
					<h3>{ this.props.speaker }</h3>
					<p>{ this.props.division } { this.props.year }</p>
					<h5>{ this.props.score }</h5>
					<h3># { this.props.rank + 1 }</h3>
				</div>
				<div className="col s3 m3 l3"></div>
			</div>
		)		
	}
}

export default Speech;