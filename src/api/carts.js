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

export async function addBookToCart({cartId, itemId, quantity}) {
    const reqObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({itemId, quantity})
    }
    includeToken(reqObj)

    try {
        const response = await fetch(url + `/cartItems/${cartId}`, reqObj)
        const result = await response.json()
        return result
    } catch (error) {
        //error handling
    }
}

export async function updateBookQuantity({cartItemId, quantity}) {
    const reqObj = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({quantity})
    }
    includeToken(reqObj)
    console.log(reqObj)

    try {
        const response = await fetch(url + `/cartItems/${cartItemId}`, reqObj)
        const result = await response.json()
        return result
    } catch (error) {
        //error handling
    }
}

export async function deleteBookFromCart(cartItemId) {
    const reqObj = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    includeToken(reqObj)    

    try {
        const response = await fetch(url + `/cartItems/${cartItemId}`, reqObj)
        const result = await response.json()
        return result
    } catch (error) {
        //error handling
    }
} 

//not technically an api call but it makes sense for it to live here
export function saveLocalCart(cart) {
    localStorage.removeItem("cart");
    localStorage.setItem("cart", JSON.stringify(cart));
}
