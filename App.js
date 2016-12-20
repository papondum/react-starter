import React from 'react';
import Header from './containers/Header'
import Leftmenu from './containers/Leftmenu'
import Mainfield from './containers/Mainfield'
import './style/style.scss'
class App extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="box">
      <Header/>
      <div className="row content">
        <Leftmenu/>
        <Mainfield/>
      </div>
    </div>
    );
  }
}
export default App
