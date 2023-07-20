import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dataupload from './components/Dataupload';
import Dashboard from './components/Dashborad';
import Home from './components/Home';

function App() {
    return ( 
        <Router>
            <h1>Cisco Trust Sec</h1>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/dataupload" component={Dataupload} />
                <Route path="/dashboard" component={Dashboard}/>
            </Switch>
        </Router>
     );
}

export default App;