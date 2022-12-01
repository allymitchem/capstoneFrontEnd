import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBook } from "../api/books";
import { addBookToCart, updateBookQuantity } from "../api/carts";

const BookPage = ({ user, cart, setCart }) => {
    const [book, setBook] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const {itemId} = useParams()

    useEffect(() => {
        async function callGetBook() {
            const bookData = await getBook(itemId)
            setBook(bookData)
        }
        callGetBook()
    },[])

    async function handleAdd(event) {
        event.preventDefault()
        const alreadyInCart = cart.items.findIndex((elem) => elem.itemId === book.id)
        //make the api call to add the item (either a real add or a update quanity)
        console.log(alreadyInCart);
        if (alreadyInCart === -1) {
            const newCartItem = await addBookToCart({cartId: cart.id, itemId: book.id, quantity})
            const newCart = {...cart}
            newCart.items.push(newCartItem)
            console.log(newCart);
            setCart(newCart)
        } else {
            const newCartItem = await updateBookQuantity({cartItemId: cart.items[alreadyInCart].id, quantity: cart.items[alreadyInCart].quantity + quantity})
            const newCart = {...cart};
            newCart.items[alreadyInCart].quantity = newCartItem.quantity
            setCart(newCart)
        }
    }

    return (
        <div className="book_page">
            {book ? 
                <>
                    <h1>{book.title}<small>{book.author}</small></h1>
                    <div>
                        <img src={book.imageURL} />
                        <div className="next_to_picture">
                            <p>${book.price/100}</p>
                            <input type='number' value={quantity} onChange={(elem) => setQuantity(elem.target.value)}/>
                            <button onClick={(handleAdd)}>Add to 🛒</button>
                        </div>
                    </div>
                    <p>{book.description}</p>
                </>
            : null}
        </div>
    )

}

export default BookPage