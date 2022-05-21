import React, { Component } from 'react';
import logo from './logo.svg';
import FirstComponent from './components/learning-examples/FirstComponent';
import  SecondComponent  from './components/learning-examples/SecondComponent';
import ThirdComponent from './components/learning-examples/ThirdComponent';
import './App.css';
import Counter from './components/counter/Counter';
import TodoApp from './components/todo/TodoApp';
 
class App extends Component {
  render() {
    return (
      <div className="App">
       <TodoApp></TodoApp>
      </div>
    );
  }
}

class LearningComponents extends Component {
  render() {
    return (
      <div className="LearningComponents">
        My Hello World
        <FirstComponent></FirstComponent>
        <SecondComponent></SecondComponent>
        <ThirdComponent></ThirdComponent>
      </div>
    );
  }
}

export default App;