import axios from "axios";
function AuthToken() {
  const token =
    sessionStorage.getItem("authToken") || localStorage.getItem("authToken");
  if (token !== "undefined") {
    return JSON.parse(token);
  }
  return false;
}
export default async function request(data) {
  const endpoint = "http://localhost:8800/graphql";
  const headers = {
    "content-type": "application/json",
  };
  if (AuthToken()) {
    headers.Authorization = AuthToken();
  }
  const graphqlQuery = {
    operationName: data.operationName,
    query: data.query,
    variables: data.variables,
  };
  console.log("GraphQuery:", graphqlQuery);
  const response = await axios({
    url: endpoint,
    method: "post",
    headers,
    data: graphqlQuery,
  });
  console.log("Response:", response);
  return response.data;
}
