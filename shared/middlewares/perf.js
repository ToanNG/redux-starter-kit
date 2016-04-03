import Perf from 'react-addons-perf'

export default function enablePerfTool () {
  window.Perf = Perf
  Perf.start()
  return store => next => action => {
    setTimeout(() => {
      Perf.printWasted()
    }, 1000)
    return next(action)
  }
}
