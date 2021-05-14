const options = {
  statuses: {
    none: 'NONE',
    ready: 'READY',
    live: 'LIVE',
    ended: 'ENDED',
  },
}

const preset = {
  currentGame: {
    status: options.statuses.none,
    playerAmount: 0,
  },
  currentGuesses: [
    {
      from: 'System',
      received: true,
      content: 'Welcome to the emoji-game!',
    },
  ],
}

export { options }
export { preset }

export default {
  options,
  preset,
}
