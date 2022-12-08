// const url = 'https://graceshopper-backend.onrender.com/api'
const url = 'http://localhost:3000/api'

function includeToken(paramObj) {
    const localToken = localStorage.getItem("token")
    if (localToken) {
        paramObj.headers["Authorization"] = "Bearer " + localToken
    }
}

export async function getActiveCart(userId) {
    const reqObj = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    includeToken(reqObj)

    try {
        const response = await fetch(url + `/carts/active/${userId}`, reqObj)
        const result = await response.json()
        return result
    } catch (error) {
        console.error(error);        
    }
}

export async function getAnyCart(cartId) {
    const reqObj = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    includeToken(reqObj)

    try {
        const response = await fetch(url + `/carts/${cartId}`, reqObj)
        const result = await response.json()
        return result
    } catch (error) {
        console.error(error);        
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
        console.error(error);
    }
}

export async function mergeLocalCart(userCart, localCart) {
    const addedBooks =[]
    const promises = localCart.items.map(element => {
        const indexInCart = userCart.items.findIndex(elem => elem.itemId == element.itemId)

        if (indexInCart === -1) {
            addedBooks.push({...element})
            return addBookToCart({cartId: userCart.id, itemId: element.itemId, quantity: element.quantity})
        } else {
            const existingBook = userCart.items[indexInCart]
            existingBook.quantity += element.quantity
            return updateBookQuantity(({cartItemId: existingBook.id, quantity: existingBook.quantity}))
        }
    })
    const changedBooks = await Promise.all(promises)
    addedBooks.forEach(element => {
        const cartItemId = changedBooks.find(elem => elem.itemId == element.itemId).id
        element.id = cartItemId
        userCart.items.push(element)
    })
    return changedBooks
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

    try {
        const response = await fetch(url + `/cartItems/${cartItemId}`, reqObj)
        const result = await response.json()
        return result
    } catch (error) {
        console.error(error);
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
        console.error(error);
    }
}

export async function markCartInactive(cartId) {
    const reqObj = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({active: null})
    }
    includeToken(reqObj)

    try {
        const response = await fetch(url + `/carts/${cartId}`, reqObj)
        const result = await response.json()
        return result
    } catch (error) {
        console.error(error);
    }
}

//not technically an api call but it makes sense for it to live here
export function saveLocalCart(cart) {
    localStorage.removeItem("cart");
    localStorage.setItem("cart", JSON.stringify(cart));
}


// gets the inactive carts for an order history

export async function pastCarts (userId) {
    const reqObj = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    includeToken(reqObj)

    try {
        const response = await fetch(url + `/carts/inactive/${userId}`, reqObj)
        const result = await response.json()
        return result
    } catch (error) {
        console.error(error);
    }

}


