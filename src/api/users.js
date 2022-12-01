const url = "http://localhost:3000/api";

function includeToken(paramObj) {
  const localToken = localStorage.getItem("token");
  if (localToken) {
    paramObj.headers["Authorization"] = "Bearer " + localToken;
  }
}

export async function getCurrentUser() {
  console.log("*** getCurrentUser ran ***");
  const reqObj = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  includeToken(reqObj);

  console.log(url+'/users/me', reqObj);
  try {

  
    const response = await fetch(url+'/users/me', reqObj)
    const result = await response.json();
    return result;

  } catch (error) {
    //report an error
  }
}

export async function loginUser(username, password) {
  try {
    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    };

    const response = await fetch(url + "/users/login", reqObj);
    console.log(response, "this is response");
    const result = await response.json();
    console.log(result, "this is result");
    return result;
  } catch (error) {
    console.log("this fetch isn't working");
  }
}

export async function registerUser(username, password, email) {
  try {
    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email }),
    };
    const response = await fetch(url + "/users/register", reqObj);
    const result = await response.json();
    console.log(result, "result in register api");
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function adminUserData(){
  try {
    const reqObj ={
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
    }
    includeToken(reqObj)
    
    const response = await fetch (url + "/users", reqObj)
    const result = await response.json()
    console.log(result, "this is all users hopefully")
    return result
  }catch(error){
    console.log(error)
  }

}