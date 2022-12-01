import react, { useEffect, useState } from "react";
import { BookList } from "./";
import { getAllBooks} from "../api/books"

const ProductsPage = ({cart, setCart, user}) => {
    const [bookList, setBookList] = useState([])

    useEffect(() => {
        async function callGetAllBooks() {
            const list = await getAllBooks()
            setBookList(list)
        }
        callGetAllBooks()
    },[])

    return (
        <div className="products_page">
            {bookList.length ? <BookList list={bookList} setList={setBookList} cart={cart} setCart={setCart} user={user}/> : null}
        </div>
    )
}

export default ProductsPage