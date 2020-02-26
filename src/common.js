//断言
export function assert(exp, msg = 'assert faild') {
  if (!exp) {
    throw new Error(msg);
  }
}