import react from "react";
import { Book } from "./";


const BookList = ({list, setList, cart, setCart, user}) => {

    return (
        <div className="book_list">
            {list.map((elem) => <Book key={`book_${elem.id}`} item={elem} user={user} cart={cart} setCart={setCart}/>)}
        </div>
    )
}

export default BookList