import react from "react";
import { Book } from "./";

const BookList = ({list, setList, }) => {

    return (
        <div className="book_list">
            {list.map((elem, index) => <Book key={`book_${index}`} item={elem}/>)}
        </div>
    )
}

export default BookList