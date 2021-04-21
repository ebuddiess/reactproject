import React ,  { useReducer } from 'react'
import axios from 'axios'

import contactContext from './contactContext'
import contactReducer from './contactReducer'
import types from '../Types'
import setAuthToken from '../../utils/setAuthToken'




const ContactState = props => {

const initalState = {

    contacts : null ,
    loading : true,
    current : null ,
    filter : null  ,
    error : null ,
}

const [state, dispatch] = useReducer(contactReducer, initalState) 



// GET CONTACT 
const getContacts = async () => {

    setAuthToken(localStorage.token)

    try {
        const res = await axios.get('/api/contacts')
       
        dispatch({type:types.GET_CONTACTS , payload : res.data})
    
      } catch (error) {
       
        dispatch({type:types.CONTACT_ERROR , payload : error.response})
        
      }
}

const clearContacts = () => {
  dispatch({type:types.CLEAR_CONTACTS})
 }


const addContact = async (contact) => {
    const config = {
        headers : {
          'Content-Type' : 'application/json'
        }
      }

      
try {
    const res = await axios.post ('/api/contacts' ,contact,config)
    console.log(res.data)
   
    dispatch({type:types.ADD_CONTACT , payload : res.data})

  } catch (error) {
   
    dispatch({type:types.CONTACT_ERROR , payload : error.res.msg})
  }
  
}

// DELETE CONTACT 
const deleteContact = async (contact_id) => {

try {
  const res = await axios.delete(`/api/contacts/${contact_id}` ,)
  console.log(res.data)
 
  dispatch({type:types.DELETE_CONTACT, payload : contact_id})

} catch (error) {
 
  dispatch({type:types.CONTACT_ERROR , payload : error.res.msg})
}
}


// SET CURRENT 

const setCurrent = (contact) => {
 dispatch({type:types.SET_CURRENT , payload : contact})
}

// CLEAR
const clearCurrent = () => {
    dispatch({type:types.CLEAR_CURRENT})
   }

// UPDATE

const updateContact = async contact=> {
  
  const config = {
    headers : {
      'Content-Type' : 'application/json'
    }
  }
  
try {

  await axios.put(`/api/contacts/${contact._id}` ,contact,config)
  
  dispatch({type:types.UPDATE_CONTACT , payload : contact})

} catch (error) {
 
  dispatch({type:types.CONTACT_ERROR , payload : error.res.msg})
}
}


// filter

const filterContact = (text) => {
    dispatch({type:types.FILTER_CONTACTS , payload : text})

}

// CLEAR filtwr 
const clearFilterContact = () => {
    dispatch({type:types.CLEAR_FILTER})
   }



return (
    <contactContext.Provider value= {{contacts:state.contacts , clearContacts , error : state.error , filter : state.filter ,clearFilterContact , addContact , getContacts , filterContact , deleteContact ,setCurrent , clearCurrent , updateContact , current:state.current}} >  {props.children} </contactContext.Provider>
) 
}

export default ContactState 

