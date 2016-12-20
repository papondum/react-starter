import React from 'react';
import './style.scss'
class TabContaint extends React.Component {
  constructor(props){
    super(props);
  }
  opentab(data){
    console.log(data);
  }
  render(){
    return (
      <div className='tab-containt' onClick={()=>this.opentab(this.props.data)}>
        {this.props.data}
      </div>

    );
  }
}
export default TabContaint
