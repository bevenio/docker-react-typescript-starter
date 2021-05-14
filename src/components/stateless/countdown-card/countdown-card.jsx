import './countdown-card.scss'

import React from 'react'

export class CountdownCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      unveilTime: this.createUnveilTime(),
      intervalId: null,
      timeLeft: 0,
    }
  }

  componentDidMount() {
    this.registerInterval()
  }

  componentWillUnmount() {
    this.unregisterInterval()
  }

  createUnveilTime() {
    const { time } = this.props
    const timeInSeconds = time || 0
    const now = new Date()
    now.setSeconds(now.getSeconds() + timeInSeconds)
    return now
  }

  registerInterval() {
    const { unveilTime } = this.state

    const updateTime = () => {
      const now = new Date()
      const difference = unveilTime.getTime() - now.getTime()
      const secondsBetweenDates = Math.round(Math.abs(difference / 1000))
      this.setState({
        timeLeft: secondsBetweenDates,
      })
    }

    updateTime()
    this.setState({
      intervalId: window.setInterval(updateTime, 1000),
    })
  }

  unregisterInterval() {
    const { intervalId } = this.state
    window.clearInterval(intervalId)
  }

  render() {
    const { children } = this.props
    const { unveilTime, timeLeft } = this.state

    if (unveilTime.getTime() <= new Date().getTime()) {
      this.unregisterInterval()
      return children
    }

    const countDown = <div className="app-countdown-time">{timeLeft}</div>

    return timeLeft === 0 ? '' : countDown
  }
}

export default CountdownCard
