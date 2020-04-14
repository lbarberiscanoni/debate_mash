import React, { Component } from 'react';
import axios from "axios";
import Footer from "./Footer";
import Speech from "./Speech";

class Archive extends Component {
	render() {
		return(
          <div className="container">
            <div className="row">
              <h4>2007</h4>
              <video className="responsive-video" controls>
                <source src="https://s3-us-west-1.amazonaws.com/congress-full-sessions/2007_p1.mp4" type="video/mp4"></source>
              </video>
            </div>
            <div className="row">
              <h4>2008</h4>
              <video className="responsive-video" controls>
                <source src="https://s3-us-west-1.amazonaws.com/congress-full-sessions/2007_p2.mp4" type="video/mp4"></source>
              </video>
            </div>
            <div className="row">
              <h4>2009</h4>
              <video className="responsive-video" controls>
                <source src="https://s3-us-west-1.amazonaws.com/congress-full-sessions/2007_p3.mp4" type="video/mp4"></source>
              </video>
            </div> 
          </div> 
		)		
	}
}

export default Archive;