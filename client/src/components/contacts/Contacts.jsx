import React , { useContext , useEffect} from 'react'

import contactContext from '../../context/contacts/contactContext'
import {ContactItem} from './ContactItem'
import Spinner from '../layouts/Spinner'




const Contacts = () => {

    const ctx = useContext(contactContext) 
    const { contacts , filter , loading } = ctx
    
    useEffect(() => {
       
        ctx.getContacts()
             // eslint-disable-next-line
     }, [])
   

    if(contacts !== null && contacts.length === 0  &&  !loading ) {
        return <h4> No Contacts </h4>
    }

    return (
        <div>
            { contacts!=null && !loading ? <div>
                {filter !==  null ? filter.map(contact =>  <ContactItem key={contact._id} contact={contact} />) : contacts.map(contact =>  <ContactItem key={contact._id} contact={contact} /> ) }
            </div> : <Spinner/> }
        </div>
    )

}

export default Contacts