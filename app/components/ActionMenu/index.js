import React, {PropTypes} from 'react';
import './style.scss'
class ActionMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainField: null
        };
    }

    render() {
        return(
          <div className='action-group-btn'>
          <button>Create</button>
          <button>Edit</button>
          <button>Copy</button>
          <button>Delete</button>
          <button>Attach</button>
          <button>Email</button>
          <button>Print</button>
          <button>Export</button>
          <button>Refresh</button>
          </div>)
        }
}

export default ActionMenu
