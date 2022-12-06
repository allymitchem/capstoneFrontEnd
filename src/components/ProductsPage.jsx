import react, { useEffect, useState } from "react";
import { BookList } from "./";
import { getAllBooks} from "../api/books"

const ProductsPage = ({cart, setCart, user}) => {
    const [fullList, setFullList] = useState([])
    const [bookList, setBookList] = useState([])
    const [searchStr, setSearchStr] = useState("")

    useEffect(() => {
        async function callGetAllBooks() {
            const list = await getAllBooks()
            setFullList(list)
            setBookList(list)
        }
        callGetAllBooks()
    },[])

    function handleSearch(event) {
        event.preventDefault()

        const searchList = fullList.filter((elem) => elem.title.includes(searchStr))
        setBookList(searchList)
    }

    return (
        <div className="products_page">
            <div className="search_bar">
                <input type='text' className='search_input' value={searchStr} onChange={(e) => {setSearchStr(e.target.value)}}/>
                <button className="search_button" onClick={handleSearch}>Search</button>
            </div>
            {bookList.length ? <BookList list={bookList} setList={setBookList} cart={cart} setCart={setCart} user={user}/> : null}
        </div>
    )
}

export default ProductsPage