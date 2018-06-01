import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

class CreateAssociation extends Component {

  constructor() { // Attributes and functions related to association
    super();
    this.state = {
      cname: 'Companies',
      aname: 'Activities',
      startDate:'',
      endDate:'',
      company: [],
      activity: []
    };

    this.handleCompanySelect = this.handleCompanySelect.bind(this);
    this.handleActivitySelect = this.handleActivitySelect.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
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

  handleStartDateChange(startDate) {
      this.setState({
        startDate
      })
  }
  handleEndDateChange(endDate) {
      this.setState({
        endDate
      })
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

    const {cname,aname,startDate,endDate} = this.state;
    // const newStartDate = moment(startDate).format('MMMM Do YYYY, h:mm:ss a');
    // const newEndDate = moment(endDate).format('MMMM Do YYYY, h:mm:ss a');
    const newStartDate = moment(startDate).toISOString()
    const newEndDate = moment(endDate).toISOString()

    axios.post('/api/association', {
      cname,
      aname,
      startDate: newStartDate,
      endDate: newEndDate
    }).then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    const {cname,aname,startDate,endDate} = this.state;
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
                    <label for="startDate">Start Date:</label>
                    <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleStartDateChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    dateFormat="LLL"
                    timeCaption="Time"/>
                <label for="endDate">End Date:</label>
                    <DatePicker
                    selected={this.state.endDate}
                    onChange={this.handleEndDateChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    dateFormat="LLL"
                    timeCaption="Time"/>
                  </div>
              <button type="submit" class="btn btn-primary">Create Schedule</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default CreateAssociation;
