import { expose } from 'threads/worker'

const doStuffForAWhile = () => {
  let magicNumber = 1
  for (let i = 0; i < 100000000; i += 1) {
    magicNumber = magicNumber + Math.random() < 0.5 ? -i : +i
  }
  return magicNumber
}

expose({
  doStuffForAWhile,
})
