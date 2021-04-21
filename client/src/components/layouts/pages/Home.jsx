import React , {useContext, useEffect} from 'react'
import Contacts from '../../contacts/Contacts'
import ContactForm from '../../contacts/ContactForm'
import ContactFilter from '../../contacts/ContactFilter'
import authContext from '../../../context/auth/authContext'

const Home = props => {

    const authCtx = useContext(authContext)

    useEffect(() => {
        
        if(!authCtx.isAuthenticated && !localStorage.token){
            props.history.push("/login")
        }
        
        authCtx.loadUser()
             // eslint-disable-next-line
    } , [] )

    return (
        <div>
        <div className="grid-2">
            <ContactForm/>
             <div style={{height : '80vh' , padding : '20px' , marginTop : '20px' , overflowY: 'scroll'}}>
             <ContactFilter/>
            
             <Contacts />
             </div>
        </div>
        </div>
    )
}

export default Home
