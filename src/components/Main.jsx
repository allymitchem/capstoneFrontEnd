import React, { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navbar, ProductsPage, Register, BookPage, Admin, CartPage, CheckoutConfirmation } from "./"
import { getActiveCart } from "../api/carts"
import { getCurrentUser } from "../api/users"

const Main = () => {
  const [user, setUser] = useState({ id: 0, username: "guest" })
  const [cart, setCart] = useState({ id: 0, userId: 0, creatorName: "guest", items: [] })
  const [count, setCount] = useState(0)

  useEffect(() => {
    //check for token and check that the token belongs to a user
    const token = localStorage.getItem("token")
    if (token) {
      async function callGetCurrentUser() {
        const currentUser = await getCurrentUser()

        if (currentUser) {
          setUser(currentUser)
          // setCount(count + 1)
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
          const cartData = await getActiveCart(user.id)
          if (cartData) {
            setCart(cartData)
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
        <Navbar user={user} setUser={setUser} cart={cart} />
        <Routes>
          <Route
            path="products"
            element={<ProductsPage user={user} cart={cart} setCart={setCart} />}
          />
          <Route path="register" element={<Register />} />
          <Route path=":itemId" element={<BookPage user={user} cart={cart} setCart={setCart} />} />
          <Route path="admin" element={<Admin />} />
          <Route path="cart" element={<CartPage cart={cart} setCart={setCart} user={user} />} />
          <Route path="checkoutConfirmation/:cartId" element={<CheckoutConfirmation cart={cart}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Main
