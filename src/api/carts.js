const url = 'http://localhost:3000/api'

function includeToken(paramObj) {
    const localToken = localStorage.getItem("token")
    if (localToken) {
        paramObj.headers["Authorization"] = "Bearer " + localToken
    }
}

export async function getCart(userId) {
    console.log("** getCart ran **");
    const reqObj = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    includeToken(reqObj)

    console.log(url + `/carts/${userId}`, reqObj);
    try {
        const response = await fetch(url + `/carts/${userId}`, reqObj)
        const result = await response.json()
        return result
    } catch (error) {
        //do some error handling        
    }
}

export async function addBookToCart() {
    
}