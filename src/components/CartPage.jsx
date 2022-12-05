import React from "react"
import { useNavigate } from "react-router-dom"
import BookList from "./BookList"

import { CartItem, CheckoutConfirmation } from "./"
import { patchBook } from "../api/books"
import { getActiveCart, markCartInactive } from "../api/carts"

const CartPage = ({ cart, setCart, user }) => {
    const navigate = useNavigate()

    async function handleCheckout(event) {
        event.preventDefault()
        
        if (user.id) {
            //check that we have enough stock
            const newStock = cart.items.map((elem) => {
                return { ...elem, numInStock: elem.numInStock - elem.quantity }
            })
            if (newStock.every((elem) => elem.numInStock > 0)) {
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
            alert("You must be logged in to checkout. Don't worry your cart will be saved")
        }

    }

    return (
        <div className="cart_page">
            {cart && cart.items.length ? (
                <div>
                    {cart.items.map((elem) => {
                        return (
                            <CartItem
                                key={`cart_page_elem_${elem.itemId}`}
                                elem={elem}
                                cart={cart}
                                setCart={setCart}
                                user={user}
                            />
                        )
                    })}
                    <p>
                        Subtotal: $
                        {cart.items.reduce((sum, elem) => (sum += elem.price * elem.quantity), 0) /
                            100}
                    </p>
                    <button onClick={handleCheckout}>Checkout</button>
                </div>
            ) : (
                "Life is full and overflowing with the new. But it is necessary to empty out the old to make room for the new to enter. - Eileen Caddy"
            )}
        </div>
    )
}

export default CartPage
