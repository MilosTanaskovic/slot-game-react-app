import React from 'react'

/**
* @author Milos Tanaskovic
* @function WinningSound
**/

const WinningSound = () => {
  return(
    <audio autoplay="autoplay" className="player" preload="true">
      <source src="../assets/audio/winnig.wav" />
    </audio>
   )
  }


export default WinningSound