import PropTypes from "prop-types"
import React, { Component } from "react";
import "./Counter.css"

class Counter extends Component{
  constructor(){
    super()
    this.state={
      counter : 0,
      //secondCounter : 100
    }
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
    this.reset = this.reset.bind(this)
  }

  render() {
    return (
      <div className="App">
        <CounterButton incrementMethod={this.increment} decrementMethod={this.decrement}></CounterButton>
        <CounterButton by={5} incrementMethod={this.increment} decrementMethod={this.decrement}></CounterButton>
        <CounterButton by={10} incrementMethod={this.increment} decrementMethod={this.decrement}></CounterButton>

        <span className="count">{this.state.counter}</span>
        <div> 
        <button className="reset" onClick={this.reset}>Reset</button>
        </div>
      </div>
    );
  }

  reset(){
    this.setState(
      () => {
      return {counter : 0}
      //secondCounter : this.state.secondCounter+1
    }
    )
  }

  increment(by) {
    // increment = () => {
      // console.log("increment")
      //this.state.counter++ // bad practice
      this.setState(
        (prevState) => {
        return {counter : prevState.counter + by}
        //secondCounter : this.state.secondCounter+1
      }
      )  
    }

    decrement(by) {
      // increment = () => {
        // console.log("increment")
        //this.state.counter++ // bad practice
        this.setState(
          (prevState) => {
          return {counter : prevState.counter - by}
          //secondCounter : this.state.secondCounter+1
        }
        )  
      }
}

  class CounterButton extends Component{
    // constructor(){
    //   super()
     
    //   this.increment = this.increment.bind(this)
    //   this.decrement = this.decrement.bind(this)
    // }
    
    render() {
      //const style = {fontSize: "50px",padding: "30px 30px"}
    // render = () =>{
        return (
          <div className="counter">
          <button onClick={() => this.props.incrementMethod(this.props.by)}>+{this.props.by}</button>
          <button onClick={() => this.props.decrementMethod(this.props.by)}>-{this.props.by}</button>
          {/*
          <button onClick={this.increment}>+{this.props.by}</button>
          <button onClick={this.decrement}>-{this.props.by}</button>
          <span className="count">{this.state.counter}</span>
          */}
          </div>
          
        );
    }

    /*
      increment() {
      // increment = () => {
        // console.log("increment")
        //this.state.counter++ // bad practice

        this.props.incrementMethod(this.props.by)
      }

      decrement(){
        this.props.decrementMethod(this.props.by)
      }
    */
    
  }

  CounterButton.defaultProps = {
    by : 1
  }

  CounterButton.propTypes = {
    by : PropTypes.number
  }
  export default Counter;