import React from 'react'
import "../hoja-de-estilos/card.css"
function card(props) {
  return (
    <div className='card'>

        <div className='name'>
            {props.name}
        </div>
        <div className='pokemon'></div>
        <img className='pokemon-sprite' src={props.pokemon} alt="" />

        

    </div>
  )
}

export default card