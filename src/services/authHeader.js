export function authHeader() {
  let token = localStorage.getItem("_accessAuthenticatedTokenserginLanche");
  if (!!token) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
}
