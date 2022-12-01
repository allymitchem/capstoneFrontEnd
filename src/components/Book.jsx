import react, { useState } from "react";
import { NavLink } from "react-router-dom";
import { addBookToCart, updateBookQuantity } from "../api/carts";

const Book = ({item, cart, setCart}) => {
    const [thisBook, setThisBook] = useState(item)

    async function handleAdd(event) {
        event.preventDefault()
        const indexInCart = cart.items.findIndex((elem) => elem.itemId === thisBook.id)

        if (indexInCart === -1) {
            const newCartItem = await addBookToCart({cartId: cart.id, itemId: thisBook.id, quantity: 1})
            const newCart = {...cart}
            newCart.items.push(newCartItem)
            setCart(newCart)
        } else {
            const newCartItem = await updateBookQuantity({cartItemId: cart.items[indexInCart].id, quantity: cart.items[indexInCart].quantity + 1})
            const newCart = {...cart};
            newCart.items[indexInCart].quantity = newCartItem.quantity
            setCart(newCart)
        }
    }

    return (
        <div className="book">
            <h3><NavLink to={`/${thisBook.id}`}>{thisBook.title}</NavLink></h3>
            <p>{thisBook.author}</p>
            <img src={thisBook.imageURL} />
            <p>${thisBook.price/100}</p>
            <button onClick={handleAdd}>🛒</button>
        </div>
    )
}

export default Book