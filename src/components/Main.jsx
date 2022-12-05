import React, { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { getActiveCart, mergeLocalCart } from "../api/carts"
import { Navbar, ProductsPage, Register, BookPage, Admin, CartPage, CheckoutConfirmation, LandingPage, LoginForm } from "./"
import { getCurrentUser } from "../api/users"

const Main = () => {
    const [user, setUser] = useState({ id: 0, username: "guest" })
    const [cart, setCart] = useState({ id: 0, userId: 0, creatorName: "guest", items: [] })

    useEffect(() => {
    //check for token and check that the token belongs to a user
        const token = localStorage.getItem("token")
        if (token) {
            async function callGetCurrentUser() {
                const currentUser = await getCurrentUser()

                if (currentUser) {
                    setUser(currentUser)
                }
            }
            callGetCurrentUser()
        }
    }, [])

    useEffect(() => {
    //if a user is logged in then get their cart from DB

    setTimeout(() => {
        if (user.id) {
            async function callGetCart() {
                const userCart = await getActiveCart(user.id)
                const localCart = JSON.parse(localStorage.getItem("cart"))

                if (userCart) {
                    if (localCart) {
                        await mergeLocalCart(userCart,localCart)
                        localStorage.removeItem("cart")
                    }
                    setCart(userCart)
                }
            }
            callGetCart()
        } else {
        //since the user is not logged in check if they have a cart in local storage
            const localCart = localStorage.getItem("cart")
            if (localCart) {
                setCart(JSON.parse(localCart))
            } else {
                localStorage.removeItem("cart")
                setCart({ id: 0, userId: 0, creatorName: "guest", items: [] })
            }
        }
    }, 250)
}, [user])

  return (
    <div id="main">
      <BrowserRouter>
      <div className="logo_nav">
        <div>
        <img  className="logo" src="https://res.cloudinary.com/fsa2/image/upload/v1670213973/Site%20Images/1_nljlde.png"/>
        </div>
        <div className="navbar_box">
        <LoginForm user={user} setUser={setUser}/>
        <Navbar user={user} setUser={setUser} cart={cart} />
        </div>
       
      </div>
        <Routes>
          <Route
            path="products"
            element={<ProductsPage user={user} cart={cart} setCart={setCart} />}
          />
          <Route path="register" element={<Register />} />
          <Route path=":itemId" element={<BookPage user={user} cart={cart} setCart={setCart} />} />
          <Route path="admin" element={<Admin />} />
          <Route path="cart" element={<CartPage cart={cart} setCart={setCart} user={user} />} />

          <Route path="checkoutConfirmation/:userId" element={<CheckoutConfirmation />} />
          <Route path="/" element={<LandingPage/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Main
