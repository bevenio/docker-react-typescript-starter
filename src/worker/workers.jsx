import { spawn, Thread, Worker } from 'threads'

const terminateWorkersBeforeUnload = (workers) => {
  window.addEventListener('beforeunload', () => {
    const workerNames = Object.keys(workers)
    workerNames.forEach((workerName) => {
      Thread.terminate(workers[workerName])
    })
  })
}
const spawnWorkers = async () => {
  try {
    const workers = {}
    workers.demo = await spawn(new Worker('@/worker/workers/demo.worker.jsx'))

    terminateWorkersBeforeUnload(workers)
    return workers
  } catch (error) {
    throw new Error(error)
  }
}

let didWorkersSpawn = false
let spawnedWorkers = {}

const ensure = () =>
  new Promise((resolve, reject) => {
    if (didWorkersSpawn === true) {
      resolve(spawnedWorkers)
    } else {
      spawnWorkers()
        .then((workers) => {
          didWorkersSpawn = true
          spawnedWorkers = workers
          resolve(spawnedWorkers)
        })
        .catch(reject)
    }
  })

export default {
  ensure,
}
