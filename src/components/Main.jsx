import React, {useEffect, useState} from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import {Navbar, ProductsPage, Register, BookPage} from "./"
import { getCart } from "../api/carts"

const Main = () => {

    const [user, setUser] = useState(null)
    const [cart, setCart] = useState(null)

    const getLoggedInUser = async () => {
        const token = localStorage.getItem("token")
        if (token) {
            setUser(true)
        }
    }

    useEffect (()=>{
        const token = localStorage.getItem("token")
        if (token){
            getLoggedInUser()
        }

        //cart related code
        async function callGetCart() {
            const cartData = await getCart(1)
            console.log("cart data from DB", cartData);
        }
        callGetCart()
    }, [])

    return (
        <div id="main">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Navbar />}>
                        <Route path='products' element={<ProductsPage />} />
                        <Route path='register' element={<Register />} />
                        <Route path=':itemId' element={<BookPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Main;