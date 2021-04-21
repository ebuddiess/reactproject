import types from '../Types';

// eslint-disable-next-line 
export default(state,action) => {
    switch(action.type){
        case types.ADD_CONTACT : return {...state, contacts : [ action.payload ,...state.contacts  ]}  ;
        case types.DELETE_CONTACT : return {...state, contacts : state.contacts.filter(contact => contact._id !== action.payload)}  ;
        case types.SET_CURRENT : return {...state, current : action.payload }  ; 
        case types.CLEAR_CURRENT : return {...state, current : null }  ;
        case types.UPDATE_CONTACT : return {...state, contacts : state.contacts.map(contact => contact._id === action.payload._id ? action.payload : contact)}  ;
        case types.FILTER_CONTACTS : return {...state, filter : state.contacts.filter(contact => {
            const regex = new RegExp(`${action.payload}` , 'gi')
            return contact.name.match(regex) || contact.email.match(regex)
        } )}  ;
        case types.CLEAR_FILTER : return {...state, filter : null }  ;
        case types.CONTACT_ERROR : return { ...state , error : action.payload }
        case types.GET_CONTACTS : return { ...state , contacts : action.payload , loading:false }
        case types.CLEAR_CONTACTS : return { ...state , contacts : [] , loading:false }


        default : return state ;

    }
}