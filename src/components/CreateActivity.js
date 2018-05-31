import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class CreateActivity extends Component {

  constructor() {
    super();
    this.state = {
      aname:''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const {aname} = this.state;

    axios.post('/api/activity', {aname})
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    const {aname} = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD ACTIVITY
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Activity List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="name">Activity Name:</label>
                <input type="text" class="form-control" name="aname" value={aname} onChange={this.onChange} placeholder="Activity Name" />
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default CreateActivity;
