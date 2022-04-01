const ACTIONS = {
  A1: 'a1',
  A2: 'a2',
  B1: 'b1',
  B2: 'b2',
}

const HIT_TYPES = {
  MISS: { points: 0, name: 'miss', radius: Infinity },
  OK: { points: 1, name: 'ok', radius: 50 },
  GOOD: { points: 2, name: 'good', radius: 30 },
  PERFECT: { points: 3, name: 'perfect', radius: 10 },
}

export { ACTIONS }
export { HIT_TYPES }

export default {
  ACTIONS,
  HIT_TYPES,
}
