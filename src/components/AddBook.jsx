import React, {useState} from "react";
import { postBook } from "../api/books";

const AddBook = ({bookList, setBookList}) => {

    const [confirmationMessage, setConfirmationMessage] = useState("")
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
        
         if (createdBook) {
          setConfirmationMessage("Your book has been added!")
        }

        setFormData({ 
        title: "",
        author: "",
        imageURL: "",
        description: "",
        year: 0,
        price: 0,
        numInStock: 0
      })

   
     

    }

    return ( 
        <div >
          <form className="add_book_form" onSubmit={handleSubmit}>
            <label>Title <span style={{color: "red"}}>*</span> </label>
            <input 
            type="text"
            placeholder="Title"
            required
            onChange={(event) => {
                setFormData({ ...formData, title: event.target.
                  value })
                setConfirmationMessage("")
              }}
            value={formData.title}
            />
            <label>Author <span style={{color: "red"}}>*</span></label>
            <input 
            type="text"
            placeholder="Author"
            required
            onChange={(event) => {
                setFormData({ ...formData, author: event.target.value })
                setConfirmationMessage("")
              }}
            value={formData.author}
            />
            <label>Image URL </label>
            <input 
            type="text"
            placeholder="Image URL"
            onChange={(event) => {
                setFormData({ ...formData, imageURL: event.target.value })
                setConfirmationMessage("")
              }}
            value={formData.imageURL}
            />
            <label>Description <span style={{color: "red"}}>*</span> </label>
            <input 
            type="text"
            placeholder="Description"
            required
            onChange={(event) => {
                setFormData({ ...formData, description: event.target.value })
                setConfirmationMessage("")
              }}
            value={formData.description}
            />
            <label>Year </label>
            <input 
            type="number"
            placeholder="Year"
            onChange={(event) => {
                setFormData({ ...formData, year: event.target.value })
                setConfirmationMessage("")
              }}
            value={formData.year}
            />
            <label>Price <span style={{color: "red"}}>*</span></label>
            <input 
            type="number"
            placeholder="Price"
            required
            onChange={(event) => {
                setFormData({ ...formData, price: event.target.value })
                setConfirmationMessage("")
              }}
            value={formData.price}
            />
            <label>Number In Stock <span style={{color: "red"}}>*</span></label>
            <input 
            type="text"
            placeholder="Number in stock"
            required
            onChange={(event) => {
                setFormData({ ...formData, numInStock: event.target.value })
                setConfirmationMessage("")
              }}
            value={formData.numInStock}
            />
            <button type="submit">Add Book</button>
              {formData ? 
              <div>{confirmationMessage}</div>
            : null}
          </form>
        </div>
    )

}

export default AddBook