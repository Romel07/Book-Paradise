import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../App';


const CheckOut = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    const {bookId} = useParams();
    console.log(bookId);
    const [selectedBook, setSelectedBook] = useState([{}]);
    useEffect(() => {
        fetch('https://gentle-everglades-73994.herokuapp.com/books')
            .then(res => res.json())
            .then(data => setSelectedBook(data))
    }, [bookId])

    const myBook = selectedBook.find(book => book._id === bookId);
    const [mySelectedBook, setMySelectedBook] = useState([]);

    const handelBookOrder = () => {
        mySelectedBook.push(myBook, new Date().toLocaleString())
        const newBooking = { ...loggedInUser, ...mySelectedBook,}

        mySelectedBook.push(myBook);

        fetch('https://gentle-everglades-73994.herokuapp.com/addBooking',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBooking), 
        })
        .then(res => res.json())
        .then(data=>{
            console.log(data);
        })
    }

    return (
        <div>
            <h2>Welcome to checkout page ! </h2>
            <h3>Email: {loggedInUser.email}</h3>            
            <p> Book Name :<strong>{myBook?.name}</strong> ------Book Author : <strong> {myBook?.author}</strong>------Book Price :  <strong>${myBook?.price}</strong></p>
            <button onClick={handelBookOrder}>Order your Book </button>
        </div>
    );
};

export default CheckOut;