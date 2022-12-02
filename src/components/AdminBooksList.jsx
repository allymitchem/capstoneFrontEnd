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
                <div className="book">
                <h3><NavLink to= {`/${book.id}`}>Title: {book.title}</NavLink></h3>
                <p>Author: {book.author}</p>
                <p>Price: ${book.price/100}</p>
                <p>In Stock: {book.numInStock}</p>
                <img src={book.imageURL} />
                <p>Year Published: {book.year}</p>
                <DeleteBookButton book={book} bookList={bookList} setBookList={setBookList}/>

                </div>
              </div>
            );
          }) : null}
          </div>
    )

}

export default AdminBooksList