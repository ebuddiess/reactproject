import Nav from './components/layouts/Nav.jsx';

import PrivateRoute from './components/routing/PrivateRoute';


import setAuthToken from './utils/setAuthToken';


import Alert from './components/Alert';


import AlertState from './context/alert/alertState';


import Login from './components/auth/Login';


import Register from './components/auth/Register';


import AuthState from './context/auth/authState';


import ContactStates from './context/contacts/contactStates';


import About from './components/layouts/pages/About';

import Home from './components/layouts/pages/Home';

import './App.css';
import { BrowserRouter as Router , Route, Switch }from 'react-router-dom'


if(localStorage.token){
  setAuthToken(localStorage.token)
}


const  App = () => {
  return (
    <AuthState>
    <ContactStates>
    <AlertState>
    <Router>
        <Nav/>
        <div className="container">
         <Alert/>
          <Switch>
           <Route exact path ="/login" component={Login} />
           <Route exact path ="/register" component={Register} />
            <PrivateRoute exact path ="/" component={Home} />
            <Route exact path ="/about" component={About} />
          </Switch>
        </div> 
   </Router>
   </AlertState>
   </ContactStates>
   </AuthState>
  );
}

export default App;
