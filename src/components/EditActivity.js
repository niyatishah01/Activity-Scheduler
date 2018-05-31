import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class EditActivity extends Component {

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

  onChange = (e) => {
    const state = this.state.activity
    state[e.target.name] = e.target.value;
    this.setState({activity:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const {aname } = this.state.activity;

    axios.put('/api/activity/'+this.props.match.params.id, {aname })
      .then((result) => {
        this.props.history.push("/showActivity/"+this.props.match.params.id)
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT ACTIVITY NAME
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/showActivity/${this.state.activity._id}`}><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Activity List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="name">Activity Name:</label>
                <input type="text" class="form-control" name="aname" value={this.state.activity.aname} onChange={this.onChange} placeholder="Activity Name" />
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditActivity;
