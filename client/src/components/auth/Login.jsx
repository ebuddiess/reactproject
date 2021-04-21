import React , {useState , useContext , useEffect} from 'react'
import authContext from '../../context/auth/authContext'
import alertContext from '../../context/alert/alertContext'



const Login = props  => {
    const [user, setuser] = useState({
        password : '',
        email : ''
    })

    const authCtx = useContext(authContext)
    const alertCtx = useContext(alertContext)


    const onchange = (e) => {
        setuser({ ...user , [e.target.name] : e.target.value } )
     }

     useEffect(() => {

        if(authCtx.isAuthenticated){
            props.history.push("/")
        }

        if(authCtx.error != null){
            alertCtx.setAlert(authCtx.error , "danger")
            authCtx.clearError()
        }
             // eslint-disable-next-line
    }, [authCtx , props.history , authCtx.isAuthenticated])


     const onsubmit = (e) => { 
         e.preventDefault();
         if(user.email === '' || user.password === ''){
            alertCtx.setAlert(" FILL ALL FIELDS ","danger")
        }else{
            
           authCtx.loginUser({ 
               email : user.email,
               password : user.password
           })
        }
     }
    return (
        <div className="card bg-light" style={{padding:"20px"}}>
            <h1 className="text-primary text-center">LOGIN</h1>
            <form action="" method="post" onSubmit={onsubmit}>
                <input type="email" name="email" id=""  placeholder = "EMAIL " onChange={onchange} value = {user.email} />
                <input type="password" name="password"  placeholder = "PASSWORD"  onChange={onchange}id="" value = {user.password} />
                <input type="submit" value="LOGIN" className="btn btn-block btn-dark"/>
            </form>
        </div>
    )
}

export default Login
