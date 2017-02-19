import React, { Component } from 'react'

import QuestionIcon from 'react-icons/lib/md/help'
import ExclamationIcon from 'react-icons/lib/fa/exclamation'

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

  render() {
    var display = this.props.options.show? {display: 'block'}: {display: 'none'}
    return (

      <div className="w3-modal modal-confirm" style={display} onClick={this.props.options.backdrop ? "" : (event) => this.hideModal(event)}>
        <div className="modal-content  w3-animate-zoom" onClick={(event) => event.stopPropagation()} style={{'maxWidth':'400px'}}>
          <div className='modal-content-body'>

            <div className="w3-medium primary-text modal-txt">{this.props.options.message}</div>
          </div>
          <div className="actions">
            <button className="material-btn" onClick={(event) => this.ok(event)}>OK</button>
          </div>
        </div>

      </div>



    )
  }
}

export default ModalConfirm
