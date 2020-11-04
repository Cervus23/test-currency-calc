import React from 'react'
import FinalForm from '../FinalForm/index'
import TextPage from '../TextPage/index'
import {Route, NavLink} from 'react-router-dom'
import './style.css'

const Navigation = () => {
  return (
    <div className="container">
      <nav className="navigation">
        <ul className="links">
          <li>
            <NavLink to="/"  className='link calc-link' > Калькулятор </NavLink>
          </li>
          <li>
            <NavLink to={`/text/textpageid213/${new Date().toDateString()}`}  className='link text-link'> Тектовая </NavLink>
          </li>
        </ul>
      </nav>

      <Route path="/" exact component={FinalForm} />
      <Route path="/text/:id/:date" component={TextPage} />
    </div>
    
  )
}

export default Navigation