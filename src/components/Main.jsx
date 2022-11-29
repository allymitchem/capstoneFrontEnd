import React, {useEffect, useState} from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import {Navbar, ProductsPage, Register} from "./"

const Main = () => {
    const [user, setUser] = useState(null)
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
    }, [])
    return (
        <div id="main">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Navbar user={user} setUser={setUser}/>}>
                        <Route path='products' element={<ProductsPage />} />
                        <Route path='register' element={<Register />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Main;