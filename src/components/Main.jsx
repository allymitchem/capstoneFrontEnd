import React, {useEffect, useState} from "react"
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
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Main;