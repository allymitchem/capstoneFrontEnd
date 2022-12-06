import React from "react";
import { deleteBook } from "../api/books";
import { useNavigate } from "react-router-dom";
import { updateBookQuantity } from "../api/carts";

const DeleteBookButton = ({book, bookList, setBookList}) => {

    //This button/component is available via the AdminBooksList page to delete any book in the database.

    async function handleDelete(event){
        event.preventDefault()
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
    }

    return (
        <button onClick={handleDelete}>Delete Book</button>
    )

}

export default DeleteBookButton