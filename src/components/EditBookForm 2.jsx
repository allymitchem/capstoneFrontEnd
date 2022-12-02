import React, { useState } from "react";
import { patchBook } from "../api/books";

const EditBookForm = ({book, setBook}) => {

  const [inputField, setInputField] = useState({
    title: book.title,
    author: book.author,
    imageURL: book.imageURL,
    description: book.description,
    year: book.year,
    price: book.price,
    numInStock: book.numInStock
  })

  async function handleSubmit (event) {
    event.preventDefault()
    


    const editedBook = await patchBook(book.id, inputField)
    
    setBook(editedBook)

    // const title = inputField.title
    // const author = inputField.author
    // const imageURL = inputField.imageURL
    // const description = inputField.description
    // const year = inputField.year
    // const price = inputField.price
    // const numInStock = inputField.numInStock

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
        type="text"
        placeholder="Title"
        required
        onChange={(event) =>
            setInputField({ ...inputField, title: event.target.value })
          }
        value={inputField.title}
        />
        <label>Author: </label>
            <input 
            type="text"
            placeholder="Author"
            required
            onChange={(event) =>
                setInputField({ ...inputField, author: event.target.value })
              }
            value={inputField.author}
            />
        <label>Image URL: </label>
            <input 
            type="text"
            placeholder="Image URL"
            required
            onChange={(event) =>
                setInputField({ ...inputField, imageURL: event.target.value })
              }
            value={inputField.imageURL}
            />
          <label>Description: </label>
            <input 
            type="text"
            placeholder="Description"
            required
            onChange={(event) =>
                setInputField({ ...inputField, description: event.target.value })
              }
            value={inputField.description}
            />
            <label>Year: </label>
            <input 
            type="number"
            placeholder="Year"
            required
            onChange={(event) =>
                setInputField({ ...inputField, year: event.target.value })
              }
            value={inputField.year}
            />
             <label>Price: </label>
            <input 
            type="number"
            placeholder="Price"
            required
            onChange={(event) =>
                setInputField({ ...inputField, price: event.target.value })
              }
            value={inputField.price}
            />
            <label>Number In Stock: </label>
            <input 
            type="text"
            placeholder="Number in stock"
            required
            onChange={(event) =>
                setInputField({ ...inputField, numInStock: event.target.value })
              }
            value={inputField.numInStock}
            />
            <button type="submit">Update</button>
      </form>
    </div>
  )
}

export default EditBookForm