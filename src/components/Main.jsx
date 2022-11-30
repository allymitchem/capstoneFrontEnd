import React, {useEffect, useState} from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import {Navbar, ProductsPage, Register, BookPage} from "./"
import { getCart } from "../api/carts"
import { getCurrentUser } from "../api/users"

const Main = () => {
    const [user, setUser] = useState({})
    const [cart, setCart] = useState(null)

    console.log(user, "Main user State")

    useEffect(()=>{
        //check for token and check that the token belongs to a user
        const token = localStorage.getItem("token")
        if (token){
            async function callGetCurrentUser() {
                const currentUser = await getCurrentUser()
                setUser(currentUser)
            }
            callGetCurrentUser()
        }
    }, [])
    
    useEffect(() => {
        //if a user is logged in then get their cart from DB
        if (user.id) {
            async function callGetCart() {
                const cartData = await getCart(user.id)
                setCart(cartData)
            }
            callGetCart()
        } else {
            //since the user is not logged in check if they have a cart in local storage
            const localCart = localStorage.getItem('cart')
        }

    },[user])

    return (
        <div id="main">
            <BrowserRouter>
            <Navbar user={user} setUser={setUser}/>
                <Routes>
                        <Route path='products' element={<ProductsPage />} />
                        <Route path='register' element={<Register />} />
                        <Route path=':itemId' element={<BookPage user={user} cart={cart}/>} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Main;