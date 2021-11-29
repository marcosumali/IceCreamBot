import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";

import ChatRoom from './components/ChatRoom';

const App = () => {
  return (
    <Switch>
      <Route exact path="/:id" component={ChatRoom} />
    </Switch>
  )
}


export default App;