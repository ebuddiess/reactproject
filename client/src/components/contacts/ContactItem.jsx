import React , {useContext} from 'react'
import contactContext from '../../context/contacts/contactContext'

export const ContactItem = ({contact}) => {

     const context = useContext(contactContext)

     const onDelete = (data) => { 
        context.deleteContact(data)
        context.clearCurrent()
     }

     const setCurrent=(data)=>{
         context.setCurrent(data);
     }

    return (
        <div className="card bg-light" style={{padding:"20px"}}>
            <h3 className="text-primary text-left">
              <span className="fas fa-user"></span>  {contact.name} <span  style={{padding:'5px 13px' , float:'right'}} className={"badge" + (contact.type ==='professional' ? ' badge-success' : ' badge-primary')} >{contact.type}</span>
            </h3>
            <br/>
            <h4 className=" text-left">
            <span className="fas fa-envelope" /> {contact.email}
            </h4>
            <br/>
            <h4 className="text-left">
            <span className="fas fa-phone" /> {contact.phone}
            </h4>
            <p>
                <button className="btn btn-primary card btn-sm" onClick={() => setCurrent(contact)}> EDIT</button>
                <button className="btn btn-danger card btn-sm" onClick={() => onDelete(contact._id)} > DELETE</button>
            </p>
        </div>
    )
}
