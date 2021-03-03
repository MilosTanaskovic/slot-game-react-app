import React from 'react'

// import style
import './RepeatButton.scss';
/**
* @author Milos Tanaskovic
* @function RepeatButton
**/

const RepeatButton = (props) => {
  return(
    <button 
      aria-label='Repeat' 
      id='repeatButton' 
      onClick={props.onClick}>
    </button>
   )
  }


export default RepeatButton