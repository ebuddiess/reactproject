import React , { useReducer } from 'react'
import {v4 as uuid} from 'uuid'

import Types from  '../Types'
import alertContext from './alertContext'
import alertReducer from './alertReducer'




const AlertState = props => {

    const initalState = []
    
    const [state, dispatch] = useReducer(alertReducer, initalState) 

    const setAlert = (msg,type,timeout=5000) => {
        const id = uuid()

        dispatch({type:Types.SET_ALERT , payload : {msg,type,id}})

        setTimeout(()=>dispatch({type:Types.REMOVE_ALERT , payload : id}),timeout)
     }

return (
    <alertContext.Provider value ={ { alerts : state ,setAlert } }>
    { props.children} 
    </alertContext.Provider>
) 

}

export default AlertState