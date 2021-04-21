import React , {useEffect , useContext , useRef} from 'react'
import contactContext from '../../context/contacts/contactContext'


const  ContactFilter = (props) => {

   const  ctx = useContext(contactContext)
   const  text = useRef(' ')
  
   useEffect(() => {
       if(ctx.filter === null) {
           text.current.value = ''
       }
   },[ctx,ctx.filter])

   const onChange = e => {

       if(text.current.value !== ''){
           ctx.filterContact(e.target.value)
       }else{
           ctx.clearFilterContact();
       }
}


    return (
        <form>
            <input  ref={text}  type="text" name="" id="" placeholder ="SEARCH" onChange= {onChange} />
        </form>
    )
}

export default ContactFilter
