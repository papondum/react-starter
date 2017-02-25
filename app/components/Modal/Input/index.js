import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Icon from 'react-icons/lib/md/create'

import './style.scss'

class ModalInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      validateError: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  hideModal(event) {
    event.preventDefault()
    event.stopPropagation()
    this.setState({
      name: '',
      validateError: false
    })
    this.props.options.close()
  }

  handleSubmit(event) {
    event.preventDefault()
    event.stopPropagation()
    if(!this.state.validateError){
      const input = this.refs.input.value
      this.props.options.confirm(input)
      this.refs.input.value = ''
    }
  }

  hasWhiteSpace(name){
    return /\s/g.test(name);
  }

  validateName(e) {
    this.setState({
      name: e.target.value
    })
    let validateError = false
    if(this.hasWhiteSpace(e.target.value)){
      this.setState({
        validateError : false
      })
    }
    if (this.props.validate) {
      validateError = this.props.validate.indexOf(e.target.value) != -1
    }
    this.setState({validateError})
  }

  componentWillReceiveProps(nextProps){
    // Clear input when open a modal
    if(this.props.options.show === false && nextProps.options.show === true){
      this.setState({name:''})
    }
  }

  render() {

    var display = this.props.options.show? {display: 'block'}: {display: 'none'}
    const validateName = this.validateName.bind(this)

    if(this.props.options.show) {
      setTimeout(() => {
        this.refs.input.focus()
      }, 500)
    }
    return (
      <div className="w3-modal modal-input" style={display} onClick={(event) => this.hideModal(event)}>
          <div className="modal-content w3-animate-zoom" onClick={(event) => event.stopPropagation()} style={{'maxWidth':'320px'}}>
              <div className='modal-content-body'>
                  <header className="modal-header-txt"><h4>{this.props.options.header}</h4></header>
                  <div className="input-form">
                      <form onSubmit={this.handleSubmit}>
                          <p>{this.props.options.message||''}</p>
                          <div className='group input-box'>
                              <input ref='input' type="text" onChange={validateName} value={this.state.name} required/>
                              <span className="highlight"></span>
                              <span className="bar"></span>
                              {this.state.validateError && <span className="w3-label w3-small w3-text-red">{this.props.validateText}</span>}
                          </div>
                      </form>
                  </div>
              </div>
              <div className='modal-content-bot'>
                  <div className="actions">
                      <button
                          className="modal-btn-txt"
                          type="submit"
                          disabled={this.state.validateError || !this.state.name.trim()}
                          onClick={() => this.props.options.confirm(this.state.name)}>
                          {this.props.options.action === 'rename' ? 'RENAME' : 'ADD'}
                      </button>
                      <button className="modal-btn-txt" type="button" onClick={(event) => this.hideModal(event)}>CANCEL</button>
                  </div>
              </div>
          </div>
      </div>
    )
  }
}

export default ModalInput
