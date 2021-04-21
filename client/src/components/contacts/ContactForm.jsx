import React , {useState , useContext , useEffect} from 'react'
import contactContext from '../../context/contacts/contactContext'


const ContactForm = () => {

    const [contact, setContact] = useState({
         name : '',
         email : '',
         phone : '',
         type : ''
    })

    const ctx = useContext(contactContext) 
    const {current} = ctx

        useEffect(() => {
       if(ctx.current != null ) {
           setContact(ctx.current)
       } else{
           setContact({
            name : '',
            email : '',
            phone : '',
            type : ''
       })
       }
    }, [ctx ,current])

    const onchange = (e) => {
        setContact({...contact , [e.target.name] : e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(current!=null){
            ctx.updateContact(contact)
            ctx.clearCurrent()
        }else{
            ctx.addContact(contact)
        }
        setContact({
            name : "",
            email : "",
            phone : "",
            type : ""
       })
    }

    const clearCurrent = () => {
        ctx.clearCurrent()
    }

    return (
       <div className="card p-3">
           <form onSubmit={onSubmit}>
               <input type="text" name="name" id= " "  placeholder="Name" value={contact.name} onChange={onchange}/>
               <input type="email" name="email" id=" " placeholder="Email" value={contact.email} onChange={onchange} />
               <input type="text" name="phone" id=" " placeholder="Phone" value={contact.phone} onChange={onchange} />
               <h4>Contact Type</h4>
               <input type="radio" name="type" id=" " value="personal" checked={contact.type==='personal'} onChange={onchange}/> PERSONAL  <br></br>
               <input type="radio" name="type" id=" " value="professional" checked={contact.type==='professional'} onChange={onchange}/> PROFESSIONAL

               <div>
               {current !== null ? <div> <button type="submit" className="bg-primary btn"> UPDATE CONTACT </button> 
                <button type="submit" className="bg-light btn" onClick = {clearCurrent}> CLEAR  </button> </div>  : <button type="submit" className="bg-primary btn"> ADD CONTACT </button> }   
              
               </div>
           </form>
       </div>
    )
}

export default ContactForm 
