let cache = {}

/*
 * note: dispatched dataloader is cached by its name.
 * That means you should NOT use a bound action as
 * dataloader. i.e.
 *   {
 *     dataloader: getFoo.bind(null, 'bar'),
 *     data: state => state.baz.get('foo'),
 *     ...
 *   }
 * It also makes no sense, since the bound action will
 * update the dependency data diffrently from the original
 * action. The good practice is creating another action
 * creator, and another dependency data, like:
 *   function getBar () {
 *     return getFoo.call(null, 'bar')
 *   }
 *   ...
 *   {
 *     dataloader: getBar,
 *     data: state => state.baz.get('bar'),
 *     ...
 *   }
 */
export default function dataloaderMiddleware (store) {
  return next => action => {
    const { dataloader, data, action: mainAction, ...rest } = action
    let promise
    if (!dataloader) {
      return next(action)
    }

    // check for the data in store first
    if (data(store.getState())) {
      return store.dispatch(mainAction(data(store.getState())))
    }

    // try getting dispatched dataloader from cache
    if (cache[dataloader.name]) {
      promise = cache[dataloader.name]
    } else {
      promise = store.dispatch(dataloader())
      cache[dataloader.name] = promise
    }

    // if no data, dispatch the loader action
    return promise
      // use store.dispatch instead of next in case of
      // mainAction is a nested data loader
      .then(() => {
        delete cache[dataloader.name]
        return store.dispatch(mainAction(data(store.getState())))
      })
  }
}
