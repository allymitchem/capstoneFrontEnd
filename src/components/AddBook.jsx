import React, {useState} from "react";
import { postBook } from "../api/books";

const AddBook = ({bookList, setBookList}) => {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        imageURL: "",
        description: "",
        year: 0,
        price: 0,
        numInStock: 0
    })
    console.log(formData, "this is form data")

    async function handleSubmit(event){
        event.preventDefault()
        const title = formData.title
        const author = formData.author
        const imageURL = formData.imageURL
        const description = formData.description
        const year = formData.year
        const price = formData.price
        const numInStock = formData.numInStock

        const createdBook = await postBook(
            title, 
            author, 
            imageURL, 
            description, 
            year, 
            price, 
            numInStock)

        setFormData(createdBook)
         setBookList([...bookList, createdBook])
    }

    return (
        <div >
          <form className="add_book_form" onSubmit={handleSubmit}>
            <label>Title: </label>
            <input 
            type="text"
            placeholder="Title"
            required
            onChange={(event) =>
                setFormData({ ...formData, title: event.target.value })
              }
            value={formData.title}
            />
            <label>Author: </label>
            <input 
            type="text"
            placeholder="Author"
            required
            onChange={(event) =>
                setFormData({ ...formData, author: event.target.value })
              }
            value={formData.author}
            />
            <label>Image URL: </label>
            <input 
            type="text"
            placeholder="Image URL"
            required
            onChange={(event) =>
                setFormData({ ...formData, imageURL: event.target.value })
              }
            value={formData.imageURL}
            />
            <label>Description: </label>
            <input 
            type="text"
            placeholder="Description"
            required
            onChange={(event) =>
                setFormData({ ...formData, description: event.target.value })
              }
            value={formData.description}
            />
            <label>Year: </label>
            <input 
            type="number"
            placeholder="Year"
            required
            onChange={(event) =>
                setFormData({ ...formData, year: event.target.value })
              }
            value={formData.year}
            />
            <label>Price: </label>
            <input 
            type="number"
            placeholder="Price"
            required
            onChange={(event) =>
                setFormData({ ...formData, price: event.target.value })
              }
            value={formData.price}
            />
            <label>Number In Stock: </label>
            <input 
            type="text"
            placeholder="Number in stock"
            required
            onChange={(event) =>
                setFormData({ ...formData, numInStock: event.target.value })
              }
            value={formData.numInStock}
            />
            <button type="submit">Add Book</button>

          </form>
        </div>
    )

}

export default AddBook