import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBook } from "../api/books";

const BookPage = () => {
    const [book, setBook] = useState(null)
    const {itemId} = useParams()

    useEffect(() => {
        async function callGetBook() {
            const bookData = await getBook(itemId)
            setBook(bookData)
        }
        callGetBook()
    },[])

    return (
        <div className="book_page">
            {book ? 
                <>
                    <h1>{book.title}<small>{book.author}</small></h1>
                    <div>
                        <img src={book.imageURL} />
                        <p>${book.price/100}</p>
                        <button>🛒</button>
                    </div>
                    <p>{book.description}</p>
                </>
            : null}
        </div>
    )

}

export default BookPage