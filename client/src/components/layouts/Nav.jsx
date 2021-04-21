import React , {Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import authContext from '../../context/auth/authContext'
import contactContext from '../../context/contacts/contactContext'



const  Nav = ({title , icon}) => {

    const authCtx = useContext(authContext)
    const contactctx = useContext(contactContext)


    const logout = () => { 
        authCtx.logoutUser()
        contactctx.clearContacts()
  }
  
    const authLinks = (
        <Fragment>
            <li>Hello {authCtx.user!=null ? authCtx.user.name : "" }</li>
            <li onClick={logout}><a href="#!">
                <i className="fas fa-sign-out-alt"></i><span className="hide-sm">LOG OUT</span>
                </a></li>
        </Fragment>
    )

    
    const guestLinks = (
        <Fragment>
             <li><Link to='/register'>REGISTER</Link></li>
            <li><Link to='/login'>LOGIN</Link></li>
        </Fragment>
    )
    

     

    return (
        <div className="navbar bg-primary">
            <h2><i className={icon}></i>{title}</h2>
            <ul>
               { authCtx.isAuthenticated ? authLinks : guestLinks}
            </ul>
        </div>
       
    )

  }


Nav.prototype = {
    title : PropTypes.string.isRequired,
    icon: PropTypes.string
}

Nav.defaultProps = {
    title : " Contact Keeper App",
    icon : "fas fa-id-card-alt"
}
export default Nav ;
