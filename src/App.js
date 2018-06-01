import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {ButtonToolbar, DropdownButton, MenuItem, Tabs, Tab, Jumbotron} from 'react-bootstrap';
import moment from 'moment';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      companys: [],
      activitys: [],
      associations: [],
      cname: 'Choose a company'
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
      <Jumbotron>
      <Tabs bsStyle="pills" defaultActiveKey={3} justified id="uncontrolled-tab-example">
        <Tab eventKey={1} title="Company">
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
          </div>
        </Tab>
        <Tab eventKey={2} title="Activity">
        <div class="panel panel-default">
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
        </div>
        </Tab>
        <Tab eventKey={3} title="Association">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ALL ACTIVITIES IN ALL COMPANIES
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/CreateAssociation"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Association</Link></h4>
            <ButtonToolbar>
              <DropdownButton bsStyle="primary" title={this.state.cname} id="dropdown-company">
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
                  <th>Start Date and Time</th>
                  <th>End Date and Time</th>
                </tr>
              </thead>
              <tbody>
                {this.state.associations.map(association =>
                    (this.state.cname === 'Choose a company' || this.state.cname === association.cname) && <tr>
                    <td><Link to={`/showAssociation/${association._id}`}>{association.cname}</Link></td>
                    <td><Link to={`/showAssociation/${association._id}`}>{association.aname}</Link></td>
                    <td><Link to={`/showAssociation/${association._id}`}>{moment(association.startDate).format('MMMM Do YYYY, h:mm:ss a')}</Link></td>
                    <td><Link to={`/showAssociation/${association._id}`}>{moment(association.endDate).format('MMMM Do YYYY, h:mm:ss a')}</Link></td>

                  </tr>
                )}
              </tbody>
            </table>
            </div>
            </div>
        </Tab>
      </Tabs>
      </Jumbotron>
      </div>
    );
  }
}

export default App;
