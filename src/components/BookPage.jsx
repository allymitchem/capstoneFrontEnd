import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBook } from "../api/books";

const BookPage = ({ user, cart }) => {
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

        const alreadyInCart = cart.items.filter((elem) => elem.id === book.id)
        //make the api call to add the item (either a real add or a update quanity)
        if (alreadyInCart.length) {
            //update the relevent cart_item quantity
        } else {
            //create the new cart_item
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