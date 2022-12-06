import React, { useEffect, useState } from "react"
import { pastCarts } from "../api/carts"
import CartItem from "./CartItem"

const OrderHistory = ({ user }) => {
    const [orderHistory, setOrderHistory] = useState([])



    useEffect(() => {
        if (user) {
            async function getOrderHistory() {
                const pastOrders = await pastCarts(user.id)
                setOrderHistory(pastOrders)
            }
            getOrderHistory()
        }
    }, [])

    return (
        <div className="order_history">
            {orderHistory.length ? (
                orderHistory.map((order) => {

                    return (
                        <div key={`order_${order.id}`}className="order_items">
                            <h3>Order No. {order.id}</h3>
                            <h4>Total: ${Number.parseFloat(order.items.reduce(
                        (sum, elem) => ((sum += elem.price * elem.quantity) * 1.0875),
                        0
                    ) / 100).toFixed(2) }</h4>
                    {/* <h4>Total: ${`${Number.parseFloat(order.items.reduce(
                        (sum, elem) => ((sum += elem.price * elem.quantity) * 1.0875))).toFixed(2)}`}</h4> */}
                    {order.items.map((item) => {
                        return (<div className="single_item" key={`items_${item.id}`}><p>Title: {item.title}</p><p>Author: {item.author}</p><img src={item.imageURL}/>
                        <p>Price: ${item.price/100}</p><p>Quantity: {item.quantity}</p></div>)
                    }
)}
                    </div>)
                })
            ) : (
                <h3>Pulling all the books from your shelves</h3>
            )}
        </div>
    )
}

export default OrderHistory
