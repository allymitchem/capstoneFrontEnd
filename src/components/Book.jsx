import react, { useState } from "react";
import { NavLink } from "react-router-dom";
import { addBookToCart, saveLocalCart, updateBookQuantity, deleteBookFromCart } from "../api/carts";

const Book = ({item, cart, setCart}) => {
    const [thisBook, setThisBook] = useState(item)

    async function handleAdd(event) {
        event.preventDefault()
        const indexInCart = cart.items.findIndex((elem) => elem.itemId === thisBook.id)

        if (cart.userId) {
            if (indexInCart === -1) {
                const newCartItem = await addBookToCart({cartId: cart.id, itemId: thisBook.id, quantity: 1})
                const newCart = {...cart}
                newCart.items = [...cart.items]
                newCart.items.push(newCartItem)
                setCart(newCart)
            } else {
                const newCartItem = await updateBookQuantity({cartItemId: cart.items[indexInCart].id, quantity: cart.items[indexInCart].quantity + 1})
                const newCart = {...cart}
                newCart.items = [...cart.items]
                newCart.items[indexInCart].quantity = newCartItem.quantity
                setCart(newCart)
            }
        } else {
            if (indexInCart === -1) {
                const newCartItem = {...thisBook, itemId: thisBook.id, quantity: 1}
                delete newCartItem.id
                const newCart = {...cart}
                newCart.items = [...cart.items]
                newCart.items.push(newCartItem)
                setCart(newCart)
                saveLocalCart(newCart)
            } else {
                const newCart = {...cart}
                newCart.items = [...cart.items]
                newCart.items[indexInCart].quantity += 1
                setCart(newCart)
                saveLocalCart(newCart)
            }
        }
    }

    async function handleDelete(event) {
        event.preventDefault()

        const indexInCart = cart.items.findIndex((elem) => elem.itemId === thisBook.id)

        if (cart.userId) {
            await deleteBookFromCart(cart.items[indexInCart].id)
            const newCart = {...cart}
            newCart.items = cart.items.filter((_, index) => index != indexInCart)
            setCart(newCart)
        } else {
            const newCart = {...cart}
            newCart.items = cart.items.filter((_, index) => index != indexInCart)
            setCart(newCart)
            saveLocalCart(newCart)
        }
    }

    return (
        <div className="book">
            <h3><NavLink to={`/${thisBook.id}`}>{thisBook.title}</NavLink></h3>
            <p>{thisBook.author}</p>
            <img src={thisBook.imageURL} />
            <p>${thisBook.price/100}</p>
            <button onClick={handleAdd}>🛒</button>
            {(cart.items.findIndex((elem) => elem.itemId === thisBook.id) !== -1) ? 
                <button onClick={handleDelete}>🗑️</button>
            : null}
        </div>
    )
}

export default Book