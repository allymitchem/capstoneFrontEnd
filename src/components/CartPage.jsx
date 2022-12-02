import React from "react"
import BookList from "./BookList"

import { CartItem } from "./"
import { patchBook } from "../api/books"
import { getCart, markCartInactive } from "../api/carts"

const CartPage = ({ cart, setCart, user }) => {
  async function handleCheckout(event) {
    event.preventDefault()
    //this does not checkout a guest user yet

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
      const cartData = await getCart(user.id)
      setCart(cartData)
    } else {
      alert("There is not enough stock")
    }
  }

  return (
    <div className="cart_page">
      {cart && cart.items.length
        ? cart.items.map((elem) => {
            return (
              <CartItem
                key={`cart_page_elem_${elem.itemId}`}
                elem={elem}
                cart={cart}
                setCart={setCart}
                user={user}
              />
            )
          })
        : "Life is full and overflowing with the new. But it is necessary to empty out the old to make room for the new to enter. - Eileen Caddy"}
      <p>
        Subtotal: ${cart.items.reduce((sum, elem) => (sum += elem.price * elem.quantity), 0) / 100}
      </p>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  )
}

export default CartPage
