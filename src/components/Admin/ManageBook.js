import React, { useEffect, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import {
    Link
  } from "react-router-dom";

const ManageBook = () => {

    const [books, setBooks] = useState([])

    useEffect(() => {
        fetch('http://localhost:5055/books')
            .then(res => res.json())
            .then(data => setBooks(data))
    }, [])

    const deleteBook = (id) => {
        fetch(`http://localhost:5055/delete/${id}`, 
        {method: 'DELETE'})
        .then(res => res.json())
        .then(result =>{
            console.log('deleted successfully');
        })
    }

    return (
        <div>
            <h1>Welcome to manage Book page</h1>
            <button><Link to="/admin">Add Book to Inventory</Link></button><button><Link to="/managebook">Manage/Delete Book from Inventory</Link></button><br/><br/>
            {
                books.map(book=>  <li>  {book.name}----{book.author}----{book.price}---- <button onClick={()=>deleteBook(`${book._id}`)} ><DeleteIcon /></button> </li> ) 
            }
        </div>
    );
};

export default ManageBook;