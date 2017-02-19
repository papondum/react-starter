import React, { Component } from 'react'


import QuestionIcon from 'react-icons/lib/md/help'
import DeleteIcon from 'react-icons/lib/md/delete'

import './style.scss'

class ModalConfirm extends Component {
  constructor(props) {
    super(props)
  }

  ok(event) {
    event.stopPropagation()
    this.props.options.confirm()
  }

  hideModal(event) {
    event.stopPropagation()
    this.props.options.close()
  }
  getConfirmButton(){
    if(this.props.options.backdrop){
      return (
        <div className="modal-content-bot actions button">
            <button className="material-btn login" onClick={(event) => this.ok(event)}>{this.props.options.submitTxt}</button>
        </div>
      )
    }
    else{
      return (
        <div className="modal-content-bot actions button">
            <button className="material-btn" onClick={(event) => this.ok(event)}>{this.props.submitTxt? this.props.submitTxt:'DELETE'}</button>
            <button className="material-btn" onClick={(event) => this.hideModal(event)}>CANCEL</button>
        </div>
      )
    }
  }

  render() {
    var display = this.props.options.show? {display: 'block'}: {display: 'none'}
    return (
      <div className="w3-modal modal-confirm" style={display} onClick={this.props.options.backdrop ? "" : (event) => this.hideModal(event)}>

          <div className="modal-content  w3-animate-zoom" onClick={(event) => event.stopPropagation()} style={{'maxWidth':'400px'}}>
              <div className='flex modal-header-txt'>
                  <h3 className='h3-fixmargin'>{typeof this.props.options.header=='object'? '':this.props.options.header}</h3>
              </div>
              <div className='modal-content-body'>

                  <div className="w3-medium primary-text modal-txt">{this.props.options.message}</div>
              </div>
              {this.getConfirmButton()}
          </div>

      </div>
    )
  }
}

export default ModalConfirm
