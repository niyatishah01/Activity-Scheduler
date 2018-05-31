import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Edit extends Component {

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

  onChange = (e) => {
    const state = this.state.company
    state[e.target.name] = e.target.value;
    this.setState({company:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name } = this.state.company;

    axios.put('/api/company/'+this.props.match.params.id, { name })
      .then((result) => {
        this.props.history.push("/show/"+this.props.match.params.id)
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT COMPANY NAME
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.company._id}`}><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Company List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="name">Company Name:</label>
                <input type="text" class="form-control" name="name" value={this.state.company.name} onChange={this.onChange} placeholder="Company Name" />
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
