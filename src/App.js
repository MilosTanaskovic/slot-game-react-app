import React, { Component } from 'react';
// import components
import Slot from './components/Slot';
import RepeatButton from './components/RepeatButton';
import WinningSound from './components/WinningSound';
// import style
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      win: 0,
      balance: 100,
    }
  }  

  handleClick = () => {
    this.setState({ 
      winner: null,
      win: 0,
      balance: this.state.balance - 2,
    });
    this.emptyArray();
    this._child1.reset();
    this._child2.reset();
    this._child3.reset();
    this._child4.reset();
    this._child5.reset();
    this._child6.reset();
    this._child7.reset();
    this._child8.reset();
    this._child9.reset();
  }

  static matches = [];

  static matchingItems = [0, 0, 0, 0, 0, 0];

  finishHandler = value => {
    App.matches.push(value);  
    
    if (App.matches.length === 9) {
      let earning = this.calcEarning(App.matches);
      let prevBalance = this.state.balance;
      this.setState({
        win: earning,
        balance: prevBalance + earning,
      })
      this.resetMatchingItems();
      const { winner } = this.state;
      const first = App.matches[0];
      let results = App.matches.every(match => match === first);
      this.setState({ winner: results });
    }
  }

  resetMatchingItems = () => {
    for(let i = 0; i < 6; i++) {
      App.matchingItems[i] = 0;
    }
  }

  calcEarning = matches => {
    let earning = 0;

    if(matches[0] === matches[3] &&  matches[3] === matches[6]) {
      earning += 3;
      App.matchingItems[0] = 1;
    } 
    else if(matches[0] === matches[3]) 
    {
      earning += 2;
      App.matchingItems[1] = 1;
    }

    if(matches[1] === matches[4] &&  matches[4] === matches[7]) {
      earning += 3;
      App.matchingItems[2] = 1;
    }    
    else if(matches[1] === matches[4]) 
    {
      earning += 2;
      App.matchingItems[3] = 1;
    }

    if(matches[2] === matches[5] &&  matches[5] === matches[8]) {
      earning += 3;
      App.matchingItems[4] = 1;
    }    
    else if(matches[2] === matches[5]) 
    {
      earning += 2;
      App.matchingItems[5] = 1;
    }
    return earning;
  }

  emptyArray = () =>{
    App.matches = [];
  }

  componentDidMount() {
    this.setState({
      win: 0,
      balance: 100,
    })
  }

  render() {
    const { winner } = this.state;

    let repeatButton = null;
    let winningSound = null;

    repeatButton = <RepeatButton onClick={this.handleClick} />

    if(winner) {
      winningSound = <WinningSound />
      console.log("Perfect !!!");
    }

    return (
      <div>
        <div className="slot">
          {/** First Line */}
          <div className="slot-container first-line">
            <Slot onFinish={this.finishHandler} ref={(child) => { this._child1 = child; }} timer="1000" />
            <Slot onFinish={this.finishHandler} ref={(child) => { this._child2 = child; }} timer="1500" />
            <Slot onFinish={this.finishHandler} ref={(child) => { this._child3 = child; }} timer="2000" />
          </div>
          {/** Second Line */}
          <div className="slot-container second-line">
            <Slot onFinish={this.finishHandler} ref={(child) => { this._child4 = child; }} timer="1000" />
            <Slot onFinish={this.finishHandler} ref={(child) => { this._child5 = child; }} timer="1500" />
            <Slot onFinish={this.finishHandler} ref={(child) => { this._child6 = child; }} timer="2000" />
          </div>
          {/** Third Line */}
          <div className="slot-container third-line">
            <Slot onFinish={this.finishHandler} ref={(child) => { this._child7 = child; }} timer="1000" />
            <Slot onFinish={this.finishHandler} ref={(child) => { this._child8 = child; }} timer="1500" />
            <Slot onFinish={this.finishHandler} ref={(child) => { this._child9 = child; }} timer="2000" />
          </div>
          {/** Win Score */}
          <div className="win-container">
            {this.state.win > 2 && <span className="win-score">${this.state.win.toFixed(2)}</span>}
          </div>
        </div>
        
        {/** Score Container */}
        <div className="score-container">
          <div className="score-content"> 
            <span>$2.00</span>               
            <span>Win</span>
          </div>
          <div className="score-content">      
            <span>{this.state.win === 0 ? '---' : '$' + this.state.win.toFixed(2)}</span>          
            <span>Bet</span>
          </div>
          <div className="score-content">
            <span>${this.state.balance.toFixed(2)}</span>
            <span>Balance</span>       
          </div>
        </div>
        {/** Button */}
        {repeatButton}
      </div>
    );
  }
}

export default App;
