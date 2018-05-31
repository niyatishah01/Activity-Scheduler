import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';

class EditAssociation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cname: 'Companies',
      aname: 'Activities',
      startTime:'',
      endTime:'',
      company: [],
      activity: []
    };
    this.handleCompanySelect = this.handleCompanySelect.bind(this)
    this.handleActivitySelect = this.handleActivitySelect.bind(this)
  }

  componentDidMount() {
    axios.get('/api/association/'+this.props.match.params.id)
      .then(res => {
        this.setState({
          cname: res.data.cname,
          aname: res.data.aname,
          startTime:res.data.startTime,
          endTime:res.data.endTime
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

  handleActivitySelect(aname) {
    this.setState({
      aname
    })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const {cname,aname,startTime,endTime } = this.state;

    axios.put('/api/association/'+this.props.match.params.id, {cname,aname,startTime,endTime })
      .then((result) => {
        this.props.history.push("/showAssociation/"+this.props.match.params.id)
      });
  }

  render() {
    const {cname,aname,startTime,endTime} = this.state;

    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT ASSOCIATION
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/showAssociation/${this.state._id}`}><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Association List</Link></h4>
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

export default EditAssociation;
