export function createResponse(xhr) {
  return {
    result:'0',
    status:xhr.status,
    statusText:xhr.statusText,
    data:xhr.response
  }
}