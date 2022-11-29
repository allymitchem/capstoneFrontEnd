import react, { useState } from "react";

const Book = ({item}) => {
    const [thisBook, setThisBook] = useState(item)

    return (
        <div className="book">
            <p>{thisBook.title}</p>
            <img src={thisBook.imageURL} />
        </div>
    )
}

export default Book