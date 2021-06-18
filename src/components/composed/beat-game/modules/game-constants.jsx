const ACTIONS = {
  A1: 'a1',
  A2: 'a2',
  B1: 'b1',
  B2: 'b2',
}

const HIT_TYPES = {
  MISS: { points: 0, name: 'miss' },
  OK: { points: 1, name: 'ok' },
  GOOD: { points: 2, name: 'good' },
  PERFECT: { points: 3, name: 'perfect' },
}

export { ACTIONS }
export { HIT_TYPES }

export default {
  ACTIONS,
  HIT_TYPES,
}
