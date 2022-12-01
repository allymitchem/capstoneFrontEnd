import react from "react";
import { Book } from "./";

const BookList = ({list, setList, cart, setCart}) => {

    return (
        <div className="book_list">
            {list.map((elem) => <Book key={`book_${elem.id}`} item={elem} cart={cart} setCart={setCart}/>)}
        </div>
    )
}

export default BookList