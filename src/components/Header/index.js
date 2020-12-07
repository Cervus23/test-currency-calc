import React from 'react'
import FinalForm from '../../contaiers/FinalForm'
import TextPage from '../../contaiers/TextPage'
import {Route, NavLink} from 'react-router-dom'
import './style.css'

const Header = () => {
  return (
    <div className="container">
      <nav className="navigation">
        <ul className="links">
          <li>
            <NavLink to="/"  className='link calc-link' > Калькулятор </NavLink>
          </li>
          <li>
            <NavLink to={`/text/textpageid213/${new Date().toDateString()}`}  className='link text-link'> Текстовая </NavLink>
          </li>
        </ul>
      </nav>

      <Route path="/" exact component={FinalForm} />
      <Route path="/text/:id/:date" component={TextPage} />
    </div>
    
  )
}

export default Header