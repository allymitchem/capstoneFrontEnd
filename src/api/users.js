const url = 'http://localhost:3000/api'

function includeToken(paramObj) {
  const localToken = localStorage.getItem("token")
  if (localToken) {
      paramObj.headers["Authorization"] = "Bearer " + localToken
  }
}

export async function loginUser (username, password) {
  
  
  try {
  const reqObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({username, password}),
  };

  console.log("we are entering this function")

    const response = await fetch(url + "/users/login", reqObj)
    console.log(response, "I am response")
    const result = await response.json()
    console.log(result)
    return result
  } catch (error) {
    console.log("this fetch isn't working")
  }

}