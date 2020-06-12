import React,{useState} from 'react'
import {withRouter} from 'react-router-dom'
import './LoginPage.css'
const LoginPage = ({history})=>{
    const [pseudo,setPseudo] = useState(localStorage.getItem('pseudo')?localStorage.getItem('pseudo'):'')
    const [disabled,setDisabled] = useState(pseudo.length===0)
    const onSubmit = async (e)=>{
        
        e.preventDefault()
        //on fait appel à l'api pour se connecter

        await fetch('https://nrxfc2lxz1.execute-api.eu-west-1.amazonaws.com/dev/user',{method:"POST",body:JSON.stringify({pseudo:pseudo.toLowerCase()})})
        console.log(pseudo)
        localStorage.setItem('pseudo',pseudo)
        history.push('/home')
    }
    
    return (
    <div className="login-container">
        <div className="login-content">
            <h2>Connectez-vous pour accéder à des recommendations personalisées de films !</h2>
            <form onSubmit = {onSubmit} className="login-form">
                <h4>Votre pseudo : </h4>
                <input className="login-input" type="text" value={pseudo} onChange={(e)=>{
                    setDisabled(pseudo.length===0)
                    setPseudo(e.target.value)}} placeholder="Pseudo"/>
                <button disabled={disabled}className="login-button">Se connecter</button>
            </form>
        </div>
        
    </div>
    )
}
<<<<<<< HEAD
export default withRouter(LoginPage)

=======
export default withRouter(LoginPage)
>>>>>>> 4508c870878b153f73666c3f382299437313745c
