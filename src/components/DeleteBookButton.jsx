import React from "react";
import { deleteBook } from "../api/books";
import { useNavigate } from "react-router-dom";

const DeleteBookButton = ({book, bookList, setBookList}) => {
    // const navigate = useNavigate()

    async function handleDelete(event){
        event.preventDefault()
        // const toDelete = event.target.id
        // console.log(event.target.id, "this is todelete")
        const removedBook = await deleteBook(book.id)
        
        // navigate("/admin")
    }

    return (
        <button onClick={handleDelete}>Delete Book</button>
    )

}

export default DeleteBookButton