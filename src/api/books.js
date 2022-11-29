const url = 'http://localhost:3000/api'

function includeToken(paramObj) {
    const localToken = localStorage.getItem("token")
    if (localToken) {
        paramObj.headers["Authorization"] = "Bearer " + localToken
    }
}

export async function getAllBooks() {
    const reqObj = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }

    try {
        const response = await fetch(url+"/items", reqObj)
        const result = await response.json()
        return result
    } catch (error) {
        //do something here for sure
    }
}