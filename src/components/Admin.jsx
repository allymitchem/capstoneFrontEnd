import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { adminUserData } from "../api/users";
import { getAllBooks } from "../api/books";
import {
  BookList,
  Book,
  AddBook,
  DeleteBookButton,
  AllUsersList,
  AdminBooksList,
} from "./";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const Admin = () => {
  const [userList, setUserList] = useState([]);
  const [bookList, setBookList] = useState([]);

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
          <AllUsersList userList={userList} />
        </TabPanel>
        <TabPanel>
          <AdminBooksList bookList={bookList} setBookList={setBookList} />
        </TabPanel>
        <TabPanel>
          {" "}
          <AddBook bookList={bookList} setBookList={setBookList} />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Admin;
