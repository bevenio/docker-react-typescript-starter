import { HIT_TYPES } from './game-constants'

class GameScore {
  state = {
    score: 0,
    combo: 0,
  }

  hit(/* { action, track, duration, position } */) {
    const hitResult = HIT_TYPES.GOOD

    this.state.combo = hitResult.points > 0 ? this.state.combo + 1 : 1
    this.state.score += hitResult.points * this.state.combo

    return {
      hitType: hitResult.name,
      score: this.state.score,
      combo: this.state.combo,
    }
  }
}

export default GameScore
