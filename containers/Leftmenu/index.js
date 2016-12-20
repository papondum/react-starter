import React from 'react';
import TabContaint from './Tab/TabContaint'
class Leftmenu extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tabName:''
    }
  }
  changeTab(val){
    this.setState({tabName:val})
  }
  render(){
    return (
      <div className='left-menu'>
      <div className='tab'>
        <ul>
          <li onClick={()=>this.changeTab('sale')}>Sales</li>
          <li onClick={()=>this.changeTab('Purchase')}>Purchase</li>
          <li onClick={()=>this.changeTab('Master File')}>Master file</li>
          <li onClick={()=>this.changeTab('Inventory')}>Inventory</li>
          <li onClick={()=>this.changeTab('Report')}>Report</li>
          <li onClick={()=>this.changeTab('Dashboard')}>Dashboard</li>
        </ul>
      </div>
        <TabContaint data={this.state.tabName}/>
      </div>

    );
  }
}
export default Leftmenu
