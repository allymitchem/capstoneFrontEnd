import react, { useState } from "react";
import { NavLink } from "react-router-dom";

const Book = ({item}) => {
    const [thisBook, setThisBook] = useState(item)

    return (
        <div className="book">
            <h3><NavLink to={`/${thisBook.id}`}>{thisBook.title}</NavLink></h3>
            <p>{thisBook.author}</p>
            <img src={thisBook.imageURL} />
            <p>${thisBook.price/100}</p>
            <button>🛒</button>
        </div>
    )
}

export default Book