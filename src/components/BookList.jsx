import React, {useState} from "react";
import { Book } from "./";


const BookList = ({list, setList, cart, setCart, user}) => {

    const [searchString, setSearchString] = useState("")

    function handleSearch(book, text) {
        return book.title.toLowerCase().includes(text) ||
        book.author.toLowerCase().includes(text) ||
        book.genre.toLowerCase().includes(text)
    }
    const booksToDisplay = list.filter(book => handleSearch(book, searchString))
    console.log(searchString)


    return (
        <>        
            <input type="search" placeholder="Search by Title, Author, or Genre" value={searchString} onChange={e => setSearchString(e.target.value)}/>
            {searchString.length
            ? <div className="book_list">
                {booksToDisplay.map((elem) => <Book key={`book_${elem.id}`} item={elem} user={user} cart={cart} setCart={setCart}/>)}
            </div>
            :
            <div className="book_list">
                {list.map((elem) => <Book key={`book_${elem.id}`} item={elem} user={user} cart={cart} setCart={setCart}/>)}
            </div>
            }
        </>

    )
}

export default BookList