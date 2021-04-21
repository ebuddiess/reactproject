import React , {useContext} from 'react'
import alertContext from '../context/alert/alertContext'


const Alert = () =>  {
    const alertCtx = useContext(alertContext)

    return (
        alertCtx.alerts.length > 0 && alertCtx.alerts.map(alert => (
            <div key = {alert.id} className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle"> {alert.msg}</i>
            </div>
        ))
    )
}

export default Alert 
