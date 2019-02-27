import React, { Component } from 'react';
import Routes from '@route';
import '@assets/style/App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="test">测试</p>
        <div className="box"></div>
        <Routes/>
      </div>
    );
  }
}

export default App;
