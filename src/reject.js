export function createReject(xhr) {
  return {
    result:'-1',
    status:xhr.status,
    statusText:xhr.statusText,
    data:xhr.response
  }
}