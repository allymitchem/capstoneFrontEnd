import React from "react";
import { NavLink } from "react-router-dom";
import {DeleteBookButton} from './'


const AdminBooksList = ({bookList, setBookList}) => {

    return (
        <div className="all_books_list">
          {bookList.length ? bookList.map((book) => {
            // console.log(book, "this is book")
            return (
              <div  key={`bookList-id${book.id}`}>
                <div className="book_admin">
                <NavLink className="admin_book_title" to= {`/${book.id}`}>Title: {book.title}</NavLink>
                <p>Author: {book.author}</p>
                <p>Year Published: {book.year}</p>
                <p>Price: ${book.price/100}</p>
                <img className="book_image"src={book.imageURL} />
                <p>In Stock: {book.numInStock}</p>
                <DeleteBookButton book={book} bookList={bookList} setBookList={setBookList}/>

                </div>
              </div>
            );
          }) : null}
          </div>
    )

}

export default AdminBooksList