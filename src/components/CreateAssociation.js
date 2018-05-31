import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';

class CreateAssociation extends Component {

  constructor() {
    super();
    this.state = {
      cname: 'Companies',
      aname: 'Activities',
      startTime:'',
      endTime:'',
      company: [],
      activity: []
    };

    this.handleCompanySelect = this.handleCompanySelect.bind(this);
    this.handleActivitySelect = this.handleActivitySelect.bind(this);
  }

  onChange = (e) => {
     const state = this.state;
     state[e.target.name] = e.target.value;
     this.setState(state);
   }

  componentDidMount(){
    const self = this;
    axios.all([ axios.get('/api/company/'), axios.get('/api/activity/') ]).then(axios.spread((companyRes, activityRes) => {
        self.setState({
          company: companyRes.data,
          activity: activityRes.data
        });
        console.log(this.state.company);
        console.log(this.state.activity);
      }));
  }

  handleCompanySelect(cname) {
      this.setState({
        cname
      })
  }

  handleActivitySelect(aname) {
    this.setState({
      aname
    })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const {cname,aname,startTime,endTime} = this.state;

    axios.post('/api/association', {cname,aname,startTime,endTime})
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    const {cname,aname,startTime,endTime} = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD ASSOCIATION
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Association List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <ButtonToolbar>
                <DropdownButton title={cname} id="dropdown-company">
                  {
                    this.state.company.map(company => {
                      return <MenuItem eventKey={company.name} onSelect={this.handleCompanySelect}>{company.name}</MenuItem>
                    })
                  }
                </DropdownButton>
              </ButtonToolbar>
              <br/>
              <ButtonToolbar>
                <DropdownButton title={aname} id="dropdown-activity">
                  {
                    this.state.activity.map(activity => {
                      return <MenuItem eventKey={activity.aname} onSelect={this.handleActivitySelect}>{activity.aname}</MenuItem>
                    })
                  }
                </DropdownButton>
              </ButtonToolbar>

              <div class="form-group">
                <label for="startTime">Start Time:</label>
                <input type="time" class="form-control" name="startTime" value={startTime} onChange={this.onChange} placeholder="Start Time" />
              </div>
              <div class="form-group">
                <label for="endTime">End Time:</label>
                <input type="time" class="form-control" name="endTime" value={endTime} onChange={this.onChange} placeholder="End Time" />
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default CreateAssociation;
