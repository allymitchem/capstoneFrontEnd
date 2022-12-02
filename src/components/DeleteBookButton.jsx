import React from "react";
import { deleteBook } from "../api/books";
import { useNavigate } from "react-router-dom";
import { updateBookQuantity } from "../api/carts";

const DeleteBookButton = ({book, bookList, setBookList}) => {
    // const navigate = useNavigate()

    async function handleDelete(event){
        event.preventDefault()
        // const toDelete = event.target.id
        // console.log(event.target.id, "this is todelete")
        const removedBook = await deleteBook(book.id)
        
        if (removedBook){
            const updatedBooks = bookList.filter((book) =>{
                if (book.id == removedBook.id){
                    return false
                }
                return true
            })
            console.log(updatedBooks, "updated books")
            setBookList(updatedBooks)
        }
        // navigate("/admin")
    }

    return (
        <button onClick={handleDelete}>Delete Book</button>
    )

}

export default DeleteBookButton