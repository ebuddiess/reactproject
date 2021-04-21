import React ,  { useReducer } from 'react'
import axios from 'axios'
import AuthContext from './authContext'
import AuthReducer from './authReducer'
import types from '../Types'
import setAuthToken from '../../utils/setAuthToken'




const AuthState = props => {

const initalState = {
  token : localStorage.getItem("token"),
  isAuthenticated : null ,
  error : null ,
  loading : true ,
  user : null ,
}

const [state, dispatch] = useReducer(AuthReducer, initalState) 

// LOAD USER
 const loadUser = async () => {
  // @ todo load token into global header

  if(localStorage.token){
   setAuthToken(localStorage.token)
  }

  try {

    const res =  await axios.get ('/api/auth')
    dispatch( {
    type:types.USER_LOADED , payload : res.data
  })
    
  } catch (error) {
    dispatch( {
      type:types.AUTH_ERROR
    })
  }
  }

// REGISTER USER
const registerUser =  async formdata => {
const config = {
  headers : {
    'Content-Type' : 'application/json'
  }
}

try {
  const res = await axios.post ('/api/users' ,formdata,config)
  dispatch( {
    type:types.REGISTER_SUCCESS ,payload :res.data
  })

  loadUser()

} catch (error) {
  
  dispatch({
    type:types.REGISTER_FAIL , payload : error.response.data.msg
  })
}

}

// LOGIN USER
const loginUser = async formdata => { 

  const config = {
    headers : {
      'Content-Type' : 'application/json'
    }
  }
  
  try {
    const res = await axios.post('/api/auth' ,formdata , config)
    dispatch( {
      type:types.LOGIN_SUCCESS , payload : res.data
    })
  
    loadUser()
  
  } catch (error) {
    
    dispatch({
      type:types.LOGIN_FAIL , payload : error.response.data.msg
    })
  }

}

//LOGOUT
const logoutUser = () => {

  dispatch({
    type:types.LOGOUT 
  })
 }

//CLEAR ERROR
const clearError = () => {
  dispatch({type:types.CLEAR_ERRORS})
 }

return (
    <AuthContext.Provider value= {{  token : state.token, registerUser , clearError , loadUser , loginUser , logoutUser ,
    isAuthenticated : state.isAuthenticated ,
    error : state.error ,
    loading : state.loading , 
    user : state.user}} >
    { props.children} 
    </AuthContext.Provider>
) 

}

export default AuthState 

