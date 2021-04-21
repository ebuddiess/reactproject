import types from '../Types';

// eslint-disable-next-line 
export default(state,action) => {
    switch(action.type){

        case types.REGISTER_SUCCESS :localStorage.setItem("token",action.payload.token) ; return { 
            ...state , 
            ...action.payload ,
            isAuthenticated : true,
            loading : false 
        };
        
        case types.REGISTER_FAIL : localStorage.removeItem("token") ; return { 
            ...state , 
            token : null  ,
            isAuthenticated : false,
            loading : false ,
            user : null ,
            error : action.payload
        };
        
        case types.CLEAR_ERRORS: return { 
            ...state , 
            error : null
        };

        case types.USER_LOADED : return { 
            ...state ,
            isAuthenticated : true ,
            loading : false ,
            user : action.payload
        };
        
        
        case types.AUTH_ERROR: return { 
            ...state ,
            isAuthenticated : false ,
            loading : false ,
            user : null ,
            error  : action.payload
        };

        case types.LOGOUT: localStorage.removeItem("token") ; return { 
            ...state , 
            token : null  ,
            isAuthenticated : false,
            loading : false ,
            user : null ,
            error : null
        };


        case types.LOGIN_SUCCESS: localStorage.setItem("token",action.payload.token) ; return { 
            ...state , 
            ...action.payload ,
            isAuthenticated : true ,
            loading : false 
        }

        case types.LOGIN_FAIL : localStorage.removeItem("token") ; return { 
            ...state , 
            token : null  ,
            isAuthenticated : false,
            loading : false ,
            user : null ,
            error : action.payload
        };
        

        default : return state ;
    }
}