// const url = 'https://graceshopper-backend.onrender.com/api'
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
        console.error(error)
    }
}

export async function getBook(itemId) {
    const reqObj = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }

    try {
        const response = await fetch(url+`/items/${itemId}`, reqObj)
        const result = await response.json()
        return result
    } catch (error) {
        console.error(error)
    }
}

export async function postBook (
    title, 
    author, 
    imageURL, 
    description, 
    year, 
    price, 
    numInStock) {
  
      try{
        const reqObj = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            title, 
            author, 
            imageURL, 
            description, 
            year, 
            price, 
            numInStock})
        } 
        includeToken(reqObj)
        const response = await fetch(url + "/items", reqObj)
        const result = await response.json()
        console.log(result)
        return result
      } catch (error) {
        console.log(error)
      }
    }

export async function deleteBook (itemId) {

    try{
        const reqObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        }
        includeToken(reqObj)
        const response = await fetch(url + `/items/${itemId}`, reqObj)
        const result =  await response.json()
        return result
    } catch (error) {
        console.log(error)
    }
}

export async function patchBook (itemId, book) {

    try{
        const reqObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(book)
        }
        includeToken(reqObj)
        const response = await fetch(url + `/items/${itemId}`, reqObj)
        const result = await response.json()
        return result
    } catch (error) {
    console.log(error)
    }
}