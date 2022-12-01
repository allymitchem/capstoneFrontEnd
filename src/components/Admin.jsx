import React, {useEffect, useState} from "react";
import { adminUserData } from "../api/users";
import {getAllBooks} from "../api/books"
import {BookList, Book} from "./"

const Admin =()=> {
    
    const [userList, setUserList]= useState([])
    const [bookList, setBookList] = useState([])

    console.log(bookList)

    useEffect(()=>{
        async function getUsers (){
            const allUsers = await adminUserData()
            console.log(allUsers, "admin comp")
            setUserList(allUsers)

        }
        getUsers()
    }, [])


    useEffect(() => {
        async function callGetAllBooks() {
            const list = await getAllBooks()
            setBookList(list)
        }
        callGetAllBooks()
    },[])


    return (
        <div>
            Current Users
            {userList.map((user) => {
                return (
                    <div className="all_users_list" key={`userList-id${user.id}`}>
                        <div><b>ID: </b>{user.id}</div>
                        <div><b>Username: </b>{user.username}</div>
                        <div><b>Email: </b> {user.email}</div>
                    </div>
                )
            })

            }
            
            {bookList.map((book) => {
                return (
                    <div className="all_books_list" key={`bookList-id${book.id}`}>
                        <p>{book.title}</p>
                        <p>{book.author}</p>
                        <img src={book.imageURL}/>
                        <p></p>
                    </div>
                )
            })}
        </div>
    )

}

export default Admin