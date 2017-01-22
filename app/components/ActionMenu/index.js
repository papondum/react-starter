import React, {PropTypes} from 'react';
import './style.scss'
import createIcon from '../../resource/Icon/button_create.png'
import editIcon from '../../resource/Icon/button_edit.png'
import deleteIcon from '../../resource/Icon/button_delete.png'
import copyIcon from '../../resource/Icon/button_copy.png'

import attachIcon from '../../resource/Icon/button_create.png'
import emailIcon from '../../resource/Icon/button_create.png'

import printIcon from '../../resource/Icon/button_print.png'
import exportIcon from '../../resource/Icon/button_export.png'

import refreshIcon from '../../resource/Icon/button_create.png'
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
          <button><img src={createIcon}/> <p>Create</p></button>
          <button><img src={editIcon}/> <p>Edit</p></button>
          <button><img src={copyIcon}/> <p>Copy</p></button>
          <button><img src={deleteIcon}/> <p>Delete</p></button>
          <button><img src={attachIcon}/> <p>Attach</p></button>
          <button><img src={emailIcon}/> <p>Email</p></button>
          <button><img src={printIcon}/> <p>Print</p></button>
          <button><img src={exportIcon}/> <p>Export</p></button>
          <button><img src={refreshIcon}/> <p>Refresh</p></button>
          </div>)
        }
}

export default ActionMenu
