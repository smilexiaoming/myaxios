//断言
export function assert(exp, msg = 'assert faild') {
  if (!exp) {
    throw new Error(msg);
  }
}

export function merge(dest, src) {
  for (const name in src) {
    if (src.hasOwnProperty(name) && typeof src[name] == 'object') {
      if (!dest[name]) {
        dest[name] = {}
      }

      merge(dest[name], src[name])
    } else {
      dest[name] = src[name]
    }
  }
}

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}