import React from 'react'
import {Link} from 'react-router-dom'
import './Header.css'
const Header = ()=>(
    <div className="header">
        <h3 className="header__title">movEI</h3>
        
        <Link to='/new_movie' className="button button-link" >Ajouter un nouveau film</Link>

        <h4 className="header__welcome">Bonjour {localStorage.getItem('pseudo')} !</h4>
    </div>
)

export default Header