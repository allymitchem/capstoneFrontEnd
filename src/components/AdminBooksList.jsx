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
                <h3><NavLink to= {`/${book.id}`}>{book.title}</NavLink></h3>
                <p>{book.author}</p>
                <img src={book.imageURL} />
                <DeleteBookButton book={book} bookList={bookList} setBookList={setBookList}/>

                </div>
              </div>
            );
          }) : null}
          </div>
    )

}

export default AdminBooksList