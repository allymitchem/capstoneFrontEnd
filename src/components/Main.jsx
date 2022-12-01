import React, {useEffect, useState} from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import {Navbar, ProductsPage, Register, BookPage, Admin, CartPage} from "./"
import { getCart } from "../api/carts"
import { getCurrentUser } from "../api/users"

const Main = () => {
    const [user, setUser] = useState({id: 0, username: "guest"})
    const [cart, setCart] = useState({id: 0, userId: 0, creatorName: "guest",items: []})

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
            if (localCart) {
                setCart(JSON.parse(localCart))
            } else {
                setCart({id: 0, userId: 0, creatorName: "guest",items: []})
            }
        }
    },[user])

    

    return (
        <div id="main">
            <BrowserRouter>
            <Navbar user={user} setUser={setUser} cart={cart}/>
                <Routes>
                        <Route path='products' element={<ProductsPage user={user} cart={cart} setCart={setCart}/>} />
                        <Route path='register' element={<Register />} />
                        <Route path=':itemId' element={<BookPage user={user} cart={cart} setCart={setCart}/>} />
                        <Route path='admin' element={<Admin/>}/>
                        <Route path='cart' element={<CartPage cart={cart} setCart={setCart} user={user}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Main;