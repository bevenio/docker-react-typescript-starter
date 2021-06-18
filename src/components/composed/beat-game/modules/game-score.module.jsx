import { HIT_TYPES } from './game-constants'

const MAX_DRUM_HIT_RADIUS = HIT_TYPES.OK.radius

class GameScore {
  state = {
    score: 0,
    combo: 0,
  }

  hit({ action, track, position }) {
    const currentDrumHit = track.find(
      (drum) => Math.abs(position - drum.time) < MAX_DRUM_HIT_RADIUS
    )

    let hitResult
    if (currentDrumHit && currentDrumHit.action === action) {
      if (currentDrumHit.time - position < HIT_TYPES.PERFECT.radius) {
        hitResult = HIT_TYPES.PERFECT
      } else if (currentDrumHit.time - position < HIT_TYPES.GOOD.radius) {
        hitResult = HIT_TYPES.GOOD
      } else {
        hitResult = HIT_TYPES.OK
      }
    } else {
      hitResult = HIT_TYPES.MISS
    }

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
