import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import Ranking from "./Ranking";
import Matchup from "./Matchup";
import Archive from "./Archive";
import Dashboard from "./Dashboard";
import Profile from "./Profile";

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      "location": "main",
      "user": "anon",
      "id": "anon",
      "status": "logged out",
    }
  }

  auth(ob, endpoint) {
    axios
      .post("http://localhost:8000/" + endpoint, { ob })
      .then(
        res => {
          let ob = res["data"]["data"]
          if (ob["status"] == "success") {
            let username = ob["username"]
            let id = ob["id"]

            this.setState({
              "user": username,
              "id": id,
              "location": "main"
            })            
          } else {
            alert(ob["status"])
          }

        }
      )     
  }

  render() {
    return(
      <Router basename={process.env.PUBLIC_URL}>
        <div className="row">
          <nav>
            <ul>
              <li>
                <Link to="/" className="btn center-align">Home</Link>
              </li>
              <li>
                <Link to="/matchup" className="btn center-align">Debate Matchups</Link>
              </li>
              <li>
                <Link to="/ranking" className="btn center-align">Ranked List</Link>
              </li>
              <li>
                <Link to="/full" className="btn center-align">Full Sessions</Link>
              </li>
              <li hidden={ this.state.user == "" } >
                <a className="btn" href="https://drive.google.com/open?id=1mS_oP6hX4O1marPqGi94V5rQG_ML3RS8">Speech Bank</a>
              </li>
              <li hidden={ this.state.user == "" }>
                <a className="btn" href="https://drive.google.com/drive/u/1/folders/182vQM5iYGoDU9ie_Jklc9D6LyNLCdv4c">Resource Repository</a>
              </li>
              <li>
                <a className="btn" href="https://docs.google.com/document/d/1FcwKNcFlRTilxrsX512p8OZZMojrpittEn0Bot0bfuM/edit">Mental Models</a>
              </li>
              <li>
                <Link to="/profile">
                  <div className="chip">
                    <span>{ this.state.user == "anon" ? "login" : this.state.user }</span>
                    <span className="badge">{ this.state.user == "anon" ? "/ signup" : "456" }</span>
                  </div>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="row">
          <Route path="/" exact component={ 
            () => 
              <Dashboard />
            } 
          />   
          <Route path="/matchup" exact component={ 
            () => 
              <Matchup user= { this.state.id } /> 
            } 
          />
          <Route path="/ranking" exact component={ 
            () => 
              <Ranking />
            } 
          />
          <Route path="/full" exact component={ 
            () => 
              <Archive />
            } 
          />
          <Route path="/profile" exact component={ 
            () => 
              <Profile user={ this.state.id } auth={ this.auth.bind(this) } />
            } 
          />
        </div>
      </Router>
    )
  }
}

export default App;
