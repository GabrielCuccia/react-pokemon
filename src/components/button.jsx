import React from 'react'
import "../hoja-de-estilos/button.css"
const Button = (props) => {
  return (

    <div className='button-container'>
      <button onClick={props.funcion} className='button'>{props.icon}</button>
      <div className='shadow'></div>
    </div>
    


  )
}

export default Button