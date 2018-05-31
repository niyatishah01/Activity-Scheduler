import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ShowActivity extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activity: {}
    };
  }

  componentDidMount() {
    axios.get('/api/activity/'+this.props.match.params.id)
      .then(res => {
        this.setState({ activity: res.data });
        console.log(this.state.activity);
      });
  }

  delete(id){
    console.log(id);
    axios.delete('/api/activity/'+id)
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              {this.state.activity.aname}
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Activity List</Link></h4>
            <dl>
              <dt>Activity Name:</dt>
              <dd>{this.state.activity.aname}</dd>
            </dl>
            <Link to={`/editActivity/${this.state.activity._id}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.activity._id)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowActivity;
