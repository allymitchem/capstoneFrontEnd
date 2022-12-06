import React, { useEffect } from "react"
import { useParams } from "react-router"
import { pastCarts } from "../api/carts"

const OrderHistory = () => {
    const { userId } = useParams()
    
    useEffect(() => {
        async function getOrderHistory() {
        const pastOrders = await pastCarts(userId)
        console.log(pastOrders)
    }
    getOrderHistory()
}, [])

    return (
        <h1>I am order History</h1>


    )

}
    

export default OrderHistory
