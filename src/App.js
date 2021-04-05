import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PersonalInfoPage from './containers/PersonalInfo';
// import ChatRoomPage from './containers/ChatRoom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/personalInfo' />
        </Route>
        <Route exact path='/personalInfo' component={PersonalInfoPage} />
        {/* <Route exact path='/chatRoom' component={ChatRoomPage} /> */}
      </Switch>
    </Router>
  );
}

export default App;