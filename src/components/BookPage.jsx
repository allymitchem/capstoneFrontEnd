import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBook } from "../api/books";
import { addBookToCart, deleteBookFromCart, saveLocalCart, updateBookQuantity } from "../api/carts";
import {EditBookForm} from "./"


const BookPage = ({ user, cart, setCart }) => {
    const [book, setBook] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [readyToEdit, setReadyToEdit] = useState(false)
    const {itemId} = useParams()

    const navigate = useNavigate()

    console.log("current book", book)

    useEffect(() => {
        async function callGetBook() {
            const bookData = await getBook(itemId)
            setBook(bookData)
        }
        callGetBook()
    },[])

    async function handleAdd(event) {
        event.preventDefault()
        const indexInCart = cart.items.findIndex((elem) => elem.itemId === book.id)
        //make the api call to add the item (either a real add or a update quanity)
        if (cart.userId) {
            if (indexInCart === -1) {
                const newCartItem = await addBookToCart({cartId: cart.id, itemId: book.id, quantity})
                const newCart = {...cart}
                newCart.items = [...cart.items]
                newCart.items.push(newCartItem)
                setCart(newCart)
            } else {
                const newCartItem = await updateBookQuantity({cartItemId: cart.items[indexInCart].id, quantity: cart.items[indexInCart].quantity + Number(quantity)})
                const newCart = {...cart}
                newCart.items = [...cart.items]
                newCart.items[indexInCart].quantity = newCartItem.quantity
                setCart(newCart)
            }
        } else {
            if (indexInCart === -1) {
                const newCartItem = {...book, itemId: book.id, quantity: Number(quantity)}
                delete newCartItem.id
                const newCart = {...cart}
                newCart.items = [...cart.items]
                newCart.items.push(newCartItem)
                setCart(newCart)
                saveLocalCart(newCart)
            } else {
                const newCart = {...cart}
                newCart.items = [...cart.items]
                newCart.items[indexInCart].quantity += Number(quantity)
                setCart(newCart)
                saveLocalCart(newCart)
            }
        }
    }

    async function handleDelete(event) {
        event.preventDefault()

        const indexInCart = cart.items.findIndex((elem) => elem.itemId === book.id)

        if (user.id) {
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

    async function deleteBookDB(event){
        event.preventDefault()


        navigate("/admin")
    }

    return (
        <div className="book_page">
            {book ? 
                <>
                    <h1>{book.title} <small>{book.author}</small></h1>
                    <div>
                        <img src={book.imageURL} />
                        <div className="next_to_picture">
                            <p>${book.price/100}</p>
                            <input type='number' value={quantity} onChange={(elem) => setQuantity(elem.target.value)}/>
                            <button onClick={handleAdd}>Add to 🛒</button>
                            {cart.items.findIndex((elem) => elem.itemId === book.id) !== -1 ? 
                                <button onClick={handleDelete}>🗑️</button>
                            : null}
                                
                            {cart.userId == 1 ?
                                <button onClick={() => {setReadyToEdit(!readyToEdit)}}>Admin Edit</button>
                            : null}
                            {readyToEdit ?
                                <EditBookForm book={book} setBook={setBook}/>
                            : null}
                            {cart.userId ==1 ?
                                <button>Delete Book</button>
                            : null}
                        </div>
                    </div>
                    <p>{book.description}</p>
                </>
            : null}
        </div>
    )

}

export default BookPage