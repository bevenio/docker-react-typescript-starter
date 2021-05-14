import './chat-input.scss'

import React from 'react'

export class ChatInput extends React.Component {
  constructor() {
    super()
    this.state = {
      value: '',
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const { onSend = null } = this.props
    const { value = '' } = this.state
    if (onSend && typeof onSend === 'function' && value !== '') {
      onSend(value)
    }
    this.setState({
      value: '',
    })
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    })
  }

  render() {
    const { value = '' } = this.state
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="app-chat-input">
        <input
          type="text"
          value={value}
          onChange={this.handleChange.bind(this)}
        />
        <input type="submit" />
      </form>
    )
  }
}

export default ChatInput
