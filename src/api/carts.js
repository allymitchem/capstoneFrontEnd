const url = 'http://localhost:3000/api'

function includeToken(paramObj) {
    const localToken = localStorage.getItem("token")
    if (localToken) {
        paramObj.headers["Authorization"] = "Bearer " + localToken
    }
}

export async function getCart(userId) {
    const reqObj = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    includeToken(reqObj)

    try {
        const response = await fetch(url + `/carts/${userId}`, reqObj)
        const result = await response.json()
        return result
    } catch (error) {
        //do some error handling        
    }
}