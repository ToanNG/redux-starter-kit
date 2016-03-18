export default function dataloaderMiddleware (store) {
  return next => action => {
    const { dataloader, data, action: mainAction, ...rest } = action
    if (!dataloader) {
      return next(action)
    }

    // check for the data in store first
    if (data(store.getState())) {
      return store.dispatch(mainAction(data(store.getState())))
    }

    // if no data, dispatch the loader action
    return store.dispatch(dataloader())
      // use store.dispatch instead of next in case of
      // mainAction is a nested data loader
      .then(() => store.dispatch(mainAction(data(store.getState()))))
  }
}
