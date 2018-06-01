import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

class EditAssociation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cname: 'Companies',
      aname: 'Activities',
      newStartDate: '',
      newEndDate: '',
      company: [],
      activity: []
    };
    this.handleCompanySelect = this.handleCompanySelect.bind(this)
    this.handleActivitySelect = this.handleActivitySelect.bind(this)
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }

  componentDidMount() {
    axios.get('/api/association/'+this.props.match.params.id)
      .then(res => {
        this.setState({
          cname: res.data.cname,
          aname: res.data.aname,
          newStartDate: moment(res.data.startDate),
          newEndDate: moment(res.data.endDate)
        });

      });
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

  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  handleCompanySelect(cname) {
      this.setState({
        cname
      })
  }

  handleStartDateChange(newStartDate) {
      this.setState({
        newStartDate
      })
  }
  handleEndDateChange(newEndDate) {
      this.setState({
        newEndDate
      })
  }

  handleActivitySelect(aname) {
    this.setState({
      aname
    })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const {cname,aname,newStartDate,newEndDate} = this.state;
    // const newStartDateObj = new Date(startDate);
    // const newStartDate = moment(newStartDateObj).format('MMMM Do YYYY, h:mm:ss a');
    // const newEndDateObj = new Date(endDate);
    // const newEndDate = moment(newEndDateObj).format('MMMM Do YYYY, h:mm:ss a');

    const startDate = moment(newStartDate).toISOString()
    const endDate = moment(newEndDate).toISOString()
    axios.put('/api/association/'+this.props.match.params.id, {
      cname,
      aname,
      startDate,
      endDate
    }).then((result) => {
        this.props.history.push("/showAssociation/"+this.props.match.params.id)
      });
  }

  render() {
    const {cname,aname} = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT ASSOCIATION
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Association List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <ButtonToolbar>
                <DropdownButton title={cname} id="dropdown-company" >
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
                  selected={this.state.newStartDate}
                  onChange={this.handleStartDateChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  dateFormat="LLL"
                  timeCaption="Time"/>
              <label for="endDate">End Date:</label>
                  <DatePicker
                  selected={this.state.newEndDate}
                  onChange={this.handleEndDateChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  dateFormat="LLL"
                  timeCaption="Time"/>
                </div>

              <button type="submit" class="btn btn-success">Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditAssociation;
