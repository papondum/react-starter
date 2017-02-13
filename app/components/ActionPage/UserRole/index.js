import React, {PropTypes} from 'react';
import './style.scss';
class UserRole extends React.Component {
    constructor(props) {
        super(props);
        this.state={
          stateRole:[{

            name:'Sales',
            subitem:[{
              name:'Sale Quotation',
              value:{view:false, email:false, print:false, export:false, edit:false}},{
              name:'Sale Order',
              value:{view:false, email:false, print:false, export:false, edit:false}}]}, {

            name:'Purchase',
            subitem:[{
              name:'Purchase Order',
              value:{view:false, email:false, print:false, export:false, edit:false}}]},{

            name:'Inventory',
            subitem:[{
              name:'Good Receipt',
              value:{view:false, email:false, print:false, export:false, edit:false}}, {
              name:'Deliver order',
              value:{view:false, email:false, print:false, export:false, edit:false}}]},{

            name:'Master File',
            subitem:[{
              name:'User account',
              value:{view:false, email:false, print:false, export:false, edit:false}}, {
              name:'User role',
              value:{view:false, email:false, print:false, export:false, edit:false}}, {
              name:'Customer',
              value:{view:false, email:false, print:false, export:false, edit:false}}]}
          ]
        }
    }
    _genHeader(type){
      if(type=='create'){
        return 'Create - User account'
      }
      else if(type=='edit'){
        return 'Edit - User account'
      }
    }

    _genBodyRole(){
      let item = this.state.stateRole
      let result  = item.map(i => <tr>{i.name}</tr>)
      return result
    }

    render() {
        return(
          <div className='page-style'>
            <div className='page-head'>
              <h2>{this._genHeader(this.props.type)}</h2>
              <div className='action-group-btn'>
                <button onClick={()=>this.props.getContent('User account')}>Cancel</button>
                <button>Save</button>
              </div>
            </div>
            <hr/>
              <div className='flex'>
                <div className='input-box left flex'>
                  <label>User role:</label>
                  <input className='flex' type="text"/>
                </div>
                <div className='input-box flex'>
                  <label>Description:</label>
                  <input className='flex' type="text"/>
                </div>
              </div>

            <hr/>

            <table>
              <thead>
                <tr>
                  <td>Document</td>
                  <td>View</td>
                  <td>Email</td>
                  <td>Print</td>
                  <td>Export</td>
                  <td>Edit</td>
                </tr>
              </thead>
              <tbody>
                {this._genBodyRole()}
              </tbody>
            </table>
          </div>
        )
    }
}

export default UserRole;
