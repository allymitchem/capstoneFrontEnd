import React, { useEffect, useState } from "react";
import { adminUserData } from "../api/users";
import { getAllBooks } from "../api/books";
import { BookList, Book, AddBook } from "./";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const Admin = () => {
  const [userList, setUserList] = useState([]);
  const [bookList, setBookList] = useState([]);

  console.log(bookList);

  useEffect(() => {
    async function getUsers() {
      const allUsers = await adminUserData();
      setUserList(allUsers);
    }
    getUsers();
  }, []);

  useEffect(() => {
    async function callGetAllBooks() {
      const list = await getAllBooks();
      setBookList(list);
    }
    callGetAllBooks();
  }, []);

  return (
    <div className="admin_tabs">
      <Tabs>
        <TabList>
          <Tab>Users</Tab>
          <Tab>Books</Tab>
          <Tab>Add Book</Tab>
        </TabList>
        <TabPanel>
          {" "}
          Current Users
          {userList.map((user) => {
            return (
              <div className="all_users_list" key={`userList-id${user.id}`}>
                <div>
                  <b>ID: </b>
                  {user.id}
                </div>
                <div>
                  <b>Username: </b>
                  {user.username}
                </div>
                <div>
                  <b>Email: </b> {user.email}
                </div>
              </div>
            );
          })}
        </TabPanel>
        <TabPanel>
            <div className="all_books_list">
          {bookList.map((book) => {
            return (
              <div  key={`bookList-id${book.id}`}>
                <div className="book">
                <p>{book.title}</p>
                <p>{book.author}</p>
                <img src={book.imageURL} />
                <p></p>
                </div>
              </div>
            );
          })}
          </div>
        </TabPanel>
        <TabPanel>
          {" "}
          <AddBook bookList={bookList} setBookList={setBookList}/>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Admin;
