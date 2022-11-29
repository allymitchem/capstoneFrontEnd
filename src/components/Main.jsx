import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import {Navbar, ProductsPage} from "./"

const Main = () => {
    return (
        <div id="main">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Navbar />}>
                        <Route path='products' element={<ProductsPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Main;