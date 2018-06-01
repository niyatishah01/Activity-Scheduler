import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      company: {}
    };
  }

  componentDidMount() {
    axios.get('/api/company/'+this.props.match.params.id)
      .then(res => {
        this.setState({ company: res.data });
        console.log(this.state.company);
      });
  }

  delete(id){
    console.log(id);
    axios.delete('/api/company/'+id)
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
              {this.state.company.name}
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Company List</Link></h4>
            <ListGroup>
              <ListGroupItem header="Company Name">{this.state.company.name}</ListGroupItem>
            </ListGroup>
            <Link to={`/edit/${this.state.company._id}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.company._id)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
