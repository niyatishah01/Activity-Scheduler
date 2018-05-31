import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ShowAssociation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      association: {}
    };
  }

  componentDidMount() {
    axios.get('/api/association/'+this.props.match.params.id)
      .then(res => {
        this.setState({ association: res.data });
        console.log(this.state.association);
      });
  }

  delete(id){
    console.log(id);
    axios.delete('/api/association/'+id)
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
              {this.state.association._id}
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Association List</Link></h4>
            <dl>
              <dt>Company Name:</dt>
              <dd>{this.state.association.cname}</dd>
              <dt>Activity Name:</dt>
              <dd>{this.state.association.aname}</dd>
              <dt>Start Time:</dt>
              <dd>{this.state.association.startTime}</dd>
              <dt>End Time:</dt>
              <dd>{this.state.association.endTime}</dd>
            </dl>
            <Link to={`/editAssociation/${this.state.association._id}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.association._id)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowAssociation;
