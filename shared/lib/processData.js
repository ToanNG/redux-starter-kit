export default function process (data: Object, mapper: { [key: string]: string | Function }): Object {
  let result = {}

  for (let key in mapper) {
    if (mapper[key] instanceof Function) {
      result[key] = mapper[key](data)
    } else {
      result[key] = data[mapper[key]]
    }
  }

  return result
}
