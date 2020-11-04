import React from 'react'
import './style.css'
import { withRouter } from 'react-router-dom'
const TextPage = (props) => {
  console.log('match', props.match)
  return (
    <div className="textPage">
      <h1 className="textPage-title">Текстовая страница</h1>
      <p className="textPage-text">Это простая текстовая страница для 
        отображения параметров роута. Параметры: <br /> 
        - id:  {props.match.params.id}<br />
        - date: {props.match.params.date}
      </p>
    </div>
  )
}

export default withRouter(TextPage)