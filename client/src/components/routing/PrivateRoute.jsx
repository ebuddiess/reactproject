import React , {useContext} from 'react'
import {Route , Redirect} from 'react-router-dom'

import authContext from '../../context/auth/authContext'


const PrivateRoute = ({ component: Component , ...rest}) => {
    const authCtx = useContext(authContext)

   return (
    <Route {...rest}  render = {props => 
     !authCtx.isAuthenticated   &&  !localStorage.token ? ( <Redirect to="/login" /> ) : ( <Component {...props} />)
    } />
   )
}
    

export default PrivateRoute
