const url = "https://graceshopper-backend.onrender.com/api";

function includeToken(paramObj) {
  const localToken = localStorage.getItem("token");
  if (localToken) {
    paramObj.headers["Authorization"] = "Bearer " + localToken;
  }
}

export async function getCurrentUser() {
  const reqObj = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  includeToken(reqObj);

  
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
    console.log(reqObj);
    const response = await fetch(url + "/users/login", reqObj);
    const result = await response.json();
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
   
    return result
  }catch(error){
    console.log(error)
  }

}