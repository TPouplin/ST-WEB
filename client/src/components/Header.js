import React from 'react'
import {Link} from 'react-router-dom'
import './Header.css'
const Header = ()=>(
    <div className="header">
        <h3 className="header__title">Plateforme de recommendation de films</h3>
        <Link to='/new_movie' className="button button-link" >Ajouter un nouveau film</Link>
    </div>
)

export default Header