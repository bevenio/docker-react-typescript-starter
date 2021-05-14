import './demo.scss'

import React from 'react'
import { connect } from 'react-redux'

import { entries } from '@/store/redux-store'

export class Demo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputFieldValue: '',
    }
  }

  handleInputFieldChange(event) {
    this.setState({ inputFieldValue: event.target.value.toLowerCase() })
  }

  render() {
    const { inputFieldValue } = this.state
    const { reduxActions, reduxState } = this.props

    return (
      <>
        <h1>
          Hi, i am a <i>{'<react />'}</i> app!
        </h1>
        <p>
          The current theme is:{' '}
          {reduxState
            ? reduxState.appearance.theme
            : 'No theme, since unconnected'}
        </p>
        <p>
          You can choose between <b>light</b> and <b>dark</b>. <br />
          Redux will save the app from someone putting anything else into the
          state.
        </p>
        <input
          type="text"
          value={inputFieldValue}
          onChange={this.handleInputFieldChange.bind(this)}
        />
        <button
          type="button"
          onClick={() => {
            reduxActions.changeTheme(inputFieldValue)
          }}
        >
          Change theme
        </button>
        <button
          type="button"
          onClick={() => {
            reduxActions.requestPosts()
          }}
        >
          Request posts
        </button>
        <hr />
        <h2>Latest posts:</h2>
        <span className="app-post-list">
          {reduxState
            ? reduxState.post.posts.map((post) => (
                <div key={post.id} className="app-post">
                  <b>{post.title}</b>
                  <p>{post.body}</p>
                </div>
              ))
            : 'No post, since component is not connected'}
        </span>
      </>
    )
  }
}

// Redux Connection
const mapStateToProps = (state) => ({
  reduxState: {
    appearance: state.appearance,
    post: state.post,
  },
})
const mapDispatchToProps = (dispatch) => ({
  reduxActions: {
    changeTheme: (themeName) =>
      dispatch(entries.appearance.actions.changeTheme(themeName)),
    requestPosts: () => dispatch(entries.post.actions.requestPosts()),
  },
})
export default connect(mapStateToProps, mapDispatchToProps)(Demo)
