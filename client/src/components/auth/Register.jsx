import React , {useState , useContext , useEffect} from 'react'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'



const Register = props  => {
    const [user, setuser] = useState({
        name : '',
        password : '',
        password2 : '' ,
        email : ''
    })
    const alertCtx = useContext(AlertContext)
    const authCtx = useContext(AuthContext)

    useEffect(() => {

        if(authCtx.isAuthenticated){
            props.history.push("/")
        }

        if(authCtx.error === 'User already exist'){
            alertCtx.setAlert(authCtx.error , "danger")
            authCtx.clearError()
        }
             // eslint-disable-next-line
    }, [authCtx , props.history , authCtx.isAuthenticated])

   

    const onchange = (e) => {
        setuser({ ...user , [e.target.name] : e.target.value } )
     }

     const onsubmit = (e) => { 
         e.preventDefault();
         if(user.name === '' || user.email === '' || user.password === ''){
             alertCtx.setAlert(" FILL ALL FIELDS ","danger")
         }else if(user.password !== user.password2 ) {
             alertCtx.setAlert("Password didnt match" ,"danger")
         }else{
             
            authCtx.registerUser({ 
                name : user.name,
                email : user.email,
                password : user.password
            })
         }
     }
    return (
        <div className="card bg-light" style={{padding:"20px"}}>
            <h1 className="text-primary text-center">REGISTER</h1>
            <form action="" method="post" onSubmit={onsubmit}>
                <input type="text" name="name" minLength="4" id=""  placeholder = "YOUR NAME ?"  onChange={onchange} value = {user.name} />
                <input type="email" name="email" id=""  placeholder = "EMAIL " onChange={onchange} value = {user.email} />
                <input type="password" name="password" minLength="6"  required placeholder = "PASSWORD"  onChange={onchange}id="" value = {user.password} />
                <input type="password" minLength="6"  required name="password2"  placeholder = "CONFIRM IT " onChange={onchange} id="" value = {user.password2} />
                <input type="submit" value="REGISTER" className="btn btn-block btn-dark"/>
            </form>
        </div>
    )
}

export default Register 
