import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap'; 

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      companys: [],
      activitys: [],
      associations: [],
      cname: 'Companies'
    };

    this.handleCompanySelect = this.handleCompanySelect.bind(this)
  }

  handleCompanySelect(cname) {
      this.setState({
        cname
      })
  }


  componentDidMount() {
    axios.get('/api/company')
      .then(res => {
        this.setState({ companys: res.data });
        console.log(this.state.companys);
      });
      axios.get('/api/activity')
        .then(res => {
          this.setState({ activitys: res.data });
          console.log(this.state.activitys);
        });
        axios.get('/api/association')
          .then(res => {
            this.setState({ associations: res.data });
            console.log(this.state.associations);
          });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              COMPANY LIST
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Company</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {this.state.companys.map(company =>
                  <tr>
                    <td><Link to={`/show/${company._id}`}>{company.name}</Link></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div class="panel-heading">
            <h3 class="panel-title">
              ACTIVITY LIST
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/CreateActivity"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Activity</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {this.state.activitys.map(activity =>
                  <tr>
                    <td><Link to={`/showActivity/${activity._id}`}>{activity.aname}</Link></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div class="panel-heading">
            <h3 class="panel-title">
              ALL ACTIVITIES IN ALL COMPANIES
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/CreateAssociation"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Association</Link></h4>
            <ButtonToolbar>
              <DropdownButton title={this.state.cname} id="dropdown-company">
                {
                  this.state.companys.map(company => {
                    return <MenuItem eventKey={company.name} onSelect={this.handleCompanySelect}>{company.name}</MenuItem>
                  })
                }
              </DropdownButton>
            </ButtonToolbar>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Activity Name</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                </tr>
              </thead>
              <tbody>
                {this.state.associations.map(association =>
                    (this.state.cname === 'Companies' || this.state.cname === association.cname) && <tr>
                    <td><Link to={`/showAssociation/${association._id}`}>{association.cname}</Link></td>
                    <td><Link to={`/showAssociation/${association._id}`}>{association.aname}</Link></td>
                    <td><Link to={`/showAssociation/${association._id}`}>{association.startTime}</Link></td>
                    <td><Link to={`/showAssociation/${association._id}`}>{association.endTime}</Link></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
