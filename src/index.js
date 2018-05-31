import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Edit from './components/Edit';
import Create from './components/Create';
import Show from './components/Show';
import EditActivity from './components/EditActivity';
import CreateActivity from './components/CreateActivity';
import ShowActivity from './components/ShowActivity';
import EditAssociation from './components/EditAssociation';
import CreateAssociation from './components/CreateAssociation';
import ShowAssociation from './components/ShowAssociation';

ReactDOM.render(
  <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/edit/:id' component={Edit} />
        <Route path='/create' component={Create} />
        <Route path='/show/:id' component={Show} />
        <Route path='/editActivity/:id' component={EditActivity} />
        <Route path='/createActivity' component={CreateActivity} />
        <Route path='/showActivity/:id' component={ShowActivity} />
        <Route path='/editAssociation/:id' component={EditAssociation} />
        <Route path='/createAssociation' component={CreateAssociation} />
        <Route path='/showAssociation/:id' component={ShowAssociation} />
      </div>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
