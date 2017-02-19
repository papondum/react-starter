import React, { Component } from 'react'

import QuestionIcon from 'react-icons/lib/md/help'
import CloseIcon from 'react-icons/lib/md/clear'
import MinimizeIcon from 'react-icons/lib/fa/chevron-down'
import MaxmizeIcon from 'react-icons/lib/fa/chevron-up'

import './style.scss'

class ModalCustom extends Component {
  constructor(props) {
    super(props)
  }

  hideModal(event) {
    event.stopPropagation()
    this.props.options.close()
  }

  render() {
    let display = this.props.show ? {display: 'block'}: {display: 'none'}
    let modalClass = "modal-custom z-index3"
    if (this.props.options.customModalClass) {
      modalClass += ' ' + this.props.options.customModalClass
    } else {
      modalClass += ' w3-modal'
    }

    let headerClass = 'flex modal-header-txt'
    let bodyClass = 'modal-text'

    let closeIcon = (
      <CloseIcon/>
    )

    if (this.props.options.isMinimizable) {
      closeIcon = (
        <MinimizeIcon/>
      )
    }

    if (this.props.options.isSmallModal) {
      headerClass += '-small'
      bodyClass += '-small'
      closeIcon = (
        <MaxmizeIcon/>
      )
    }

    let modalStyle = {}
    if (this.props.options.size) {
      modalStyle.width = this.props.options.size
    }
    if (this.props.options.isSmallModal) {
      modalStyle.padding = '5px'
    }

    let closeButton = ''
    if (this.props.options.close) {
      closeButton = (
        <div onClick = {(event) => this.hideModal(event)} className="close-btn">
          {closeIcon}
        </div>
      )
    }

    return (
      <div className={modalClass} style={display} onClick={(event) => this.hideModal(event)}>

        <div className="modal-contentC w3-animate-zoom" onClick={(event) => event.stopPropagation()} style={modalStyle}>

          <div className={headerClass}>
            <h3 className='h3-fixmargin'>{typeof this.props.options.header=='object'? "Cluster detail of "+this.props.options.header.props.children[0]:this.props.options.header}</h3>
            {closeButton}
          </div>

          <div className={bodyClass}>
            {this.props.children}
          </div>

        </div>

      </div>
    )
  }
}

export default ModalCustom
