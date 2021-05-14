import './countdown-time.scss'

import React from 'react'

export class CountdownTime extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      finishDate: this.createTime(),
      intervalId: null,
      timeLeftDate: new Date(),
    }
  }

  componentDidMount() {
    this.registerInterval()
  }

  componentWillUnmount() {
    this.unregisterInterval()
  }

  createTime() {
    const { time } = this.props
    const timeInSeconds = time || 0
    const now = new Date()
    now.setSeconds(now.getSeconds() + timeInSeconds)
    return now
  }

  registerInterval() {
    const { finishDate } = this.state

    const updateTime = () => {
      const now = new Date()
      const difference = new Date(finishDate - now)
      this.setState({
        timeLeftDate: difference,
      })
    }

    updateTime()
    this.setState({
      intervalId: window.setInterval(updateTime, 100),
    })
  }

  unregisterInterval() {
    const { intervalId } = this.state
    window.clearInterval(intervalId)
  }

  render() {
    const { finishDate, timeLeftDate } = this.state

    if (finishDate.getTime() <= new Date().getTime()) {
      this.unregisterInterval()
      return <div className="app-countdown-timer">0:00</div>
    }

    const minutes = timeLeftDate.getMinutes()
    const seconds =
      timeLeftDate.getSeconds() < 10
        ? `0${timeLeftDate.getSeconds()}`
        : timeLeftDate.getSeconds()
    const formattedTime = `${minutes}:${seconds}`

    return <div className="app-countdown-timer">{formattedTime}</div>
  }
}

export default CountdownTime
