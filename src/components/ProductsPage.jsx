import React, { useEffect, useState } from "react";
import { BookList } from "./";
import { getAllBooks} from "../api/books"

const ProductsPage = ({cart, setCart, user}) => {
    const [fullList, setFullList] = useState([])
    const [bookList, setBookList] = useState([])

    useEffect(() => {
        async function callGetAllBooks() {
            const list = await getAllBooks()
            setFullList(list)
            setBookList(list)
        }
        callGetAllBooks()
    },[])


    function handleFantasy(event) {
        event.preventDefault()
        const fantasy = fullList.filter((book) => book.genre.includes("fantasy"))
        setBookList(fantasy)
    }
    function handleMystery(event) {
        event.preventDefault()
        const mystery = fullList.filter((book) => book.genre.includes("mystery"))
        setBookList(mystery)
    }
    function handleRomance(event) {
        event.preventDefault()
        const romance = fullList.filter((book) => book.genre.includes("romance"))
        setBookList(romance)
    }
    function handleClassics(event) {
        event.preventDefault()
        const classics = fullList.filter((book) => book.genre.includes("classics"))
        setBookList(classics)
    }
    function handleYA(event) {
        event.preventDefault()
        const youngAdult = fullList.filter((book) => book.genre.includes("youngAdult"))
        setBookList(youngAdult)
    }

    function handleAll(event) {
        event.preventDefault()
        async function callGetAllBooks() {
            const list = await getAllBooks()
            setBookList(list)
        }
        callGetAllBooks()
    }

    return (
        <div className="products_page">
            <div className="categories">
                <button onClick={handleFantasy}>Fantasy</button>
                <button onClick={handleMystery}>Mystery</button>
                <button onClick={handleRomance}>Romance</button>
                <button onClick={handleClassics}>Classics</button>
                <button onClick={handleYA}>Young Adult</button>
                <button onClick={handleAll}>All Books</button>
            </div>
            {bookList.length ? <BookList list={bookList} setList={setBookList} cart={cart} setCart={setCart} user={user}/> : null}
        </div>
    )
}

export default ProductsPage