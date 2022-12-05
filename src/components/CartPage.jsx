import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import BookList from "./BookList"

import { CartItem, CheckoutConfirmation } from "./"
import { patchBook } from "../api/books"
import { getActiveCart, markCartInactive } from "../api/carts"

const CartPage = ({ cart, setCart, user }) => {
    const [errorMessage, setErrorMessage] = useState(false)
    const navigate = useNavigate()
    const subTotal = cart.items.reduce(
        (sum, elem) => (sum += elem.price * elem.quantity),
        0
    ) / 100 
    const tax = subTotal * .0875
    const taxedTotal = (subTotal * 1.0875)

    async function handleCheckout(event) {
        event.preventDefault()
        
        if (user.id) {
            //check that we have enough stock
            const newStock = cart.items.map((elem) => {
                return { ...elem, numInStock: elem.numInStock - elem.quantity }
            })
            if (newStock.every((elem) => elem.numInStock >= 0)) {
                //remove the cart quantity from the stock
                for (const book of newStock) {
                    await patchBook(book.itemId, { numInStock: book.numInStock })
                }
                //mark the cart as inactive
                const deadCart = await markCartInactive(cart.id)
                //get a new cart
                const newCartData = await getActiveCart(user.id)
                setCart(newCartData)
                navigate(`/CheckoutConfirmation/${deadCart.id}`)
            } else {
                //need better message here with specifics
                
                alert("There is not enough stock")
            }
        } else {
            setErrorMessage(true)
        }

    }

    return (
        <div className="cart_page">
            <div className="quote">
                {cart.items.length ? (
                    <h2>"Wear the old coat and buy the new book." ~ Austin Phelps</h2>
                ) : ( <div className="empty_cart"><h2 >
                Life is full and overflowing with the new. But it is necessary to empty out the
                old to make room for the new to enter. <br />~ Eileen Caddy
            </h2>
            <img className="book_graphic" src="https://res.cloudinary.com/fsa2/image/upload/v1670217226/Site%20Images/Untitled_design_awbszy.png"/></div>)}
            </div>

            {cart && cart.items.length ? (
                <><div className="cart_items">
                    {cart.items.map((elem) => {
                        return (
                            <CartItem
                                key={`cart_page_elem_${elem.itemId}`}
                                elem={elem}
                                cart={cart}
                                setCart={setCart}
                                user={user} />
                        )
                    })}</div>
                    <div className="order_summary">
                        <h2>Order Summary</h2>
                        <div className="subtotal_checkout">
                        <p>
                            Subtotal: ${`${Number.parseFloat(subTotal).toFixed(2)}`}
                        </p>
                        <p>
                            Estimated Tax: ${`${Number.parseFloat(tax).toFixed(2)}`}
                        </p>
                        <p>
                            Total: ${`${Number.parseFloat(taxedTotal).toFixed(2)}`}
                        </p>
                        <button onClick={handleCheckout}>Checkout</button>
                        {errorMessage ? <p>You must be a member to checkout, don't worry your cart will be saved. Please Sign in above or <Link to="/register">Register</Link></p> : null}
                        </div>
                    </div></>
                
            ) : null }
        </div>
    )
}

export default CartPage
