import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import {Navbar, ProductsPage, Register} from "./"

const Main = () => {
    return (
        <div id="main">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Navbar />}>
                        <Route path='products' element={<ProductsPage />} />
                        <Route path='register' element={<Register />} />
                        <Route path=':itemId' element={<p>I'm the product page</p>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Main;