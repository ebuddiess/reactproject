import axios  from 'axios'

const setAuthToken =  token => {
    if(token){
        axios.defaults.headers.common['x-auth-token'] = token
    }else{
        console.log( axios.defaults.headers.common['x-auth-token'] )
        delete  axios.defaults.headers.common['x-auth-token'] 
    }
}

export default setAuthToken 