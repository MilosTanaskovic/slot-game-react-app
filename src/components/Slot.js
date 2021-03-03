import React, { Component } from 'react';

// import style
import './Slot.scss';
/**
* @author Milos Tanaskovic
* @function Slot
**/

class Slot extends Component {  
  constructor(props){
    super(props);
  };

  reset() {
    if (this.timer) { 
      clearInterval(this.timer); 
    }  

    this.start = this.setStartPosition();

    this.setState({
      position: this.start,
      timeRemaining: this.props.timer
    });

    this.timer = setInterval(() => {
      this.tick()
    }, 100);      
  }

  state = {
    position: 0,
    lastPosition: null
  }
  static iconHeight = 188;
  multiplier = Math.floor(Math.random()*(4-1)+1);

  start = this.setStartPosition();
  speed = Slot.iconHeight * this.multiplier;    

  setStartPosition() {
    return ((Math.floor((Math.random()*4))) * Slot.iconHeight)*-1;
  }

  moveBackground() {
    this.setState({ 
      position: this.state.position - this.speed,
      timeRemaining: this.state.timeRemaining - 100
    })
  }

  getSymbolFromPosition() {
    let { position } = this.state;
    const totalSymbols = 4;
    const maxPosition = (Slot.iconHeight * (totalSymbols-1)*-1);
    let moved = (this.props.timer/100) * this.multiplier
    let startPosition = this.start;
    let currentPosition = startPosition;    

    for (let i = 0; i < moved; i++) {              
      currentPosition -= Slot.iconHeight;

      if (currentPosition < maxPosition) {
        currentPosition = 0;
      }      
    }

    this.props.onFinish(currentPosition);
  }

  tick() {      
    if (this.state.timeRemaining <= 0) {
      clearInterval(this.timer);        
      this.getSymbolFromPosition();    

    } else {
      this.moveBackground();
    }      
  }
  
  setStart() {
    clearInterval(this.timer);

    this.setState({
      position: this.start,
      timeRemaining: this.props.timer
    });

    this.timer = setInterval(() => {
      this.tick()
    }, 100);
  }

  render() {
    let { position, current } = this.state;   

    return (            
      <div 
        style={{backgroundPosition: '0px ' + position + 'px'}}
        className={`icons`}   
      />
    )
  }
}
 
export default Slot