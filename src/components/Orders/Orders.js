import React, { useContext, useEffect, useState } from 'react';
import {UserContext} from '../../App'

const Orders = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    
    const [myBooking, setMyBooking] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:5055/myBooking?email='+loggedInUser.email)
        .then(res=> res.json())
        .then(data=> setMyBooking(data))
    },[])
    console.log(myBooking);
   
    return (
        <div>
            <h1>Welcome to your order </h1>
            <p>User Email : {loggedInUser.email}</p>
            {
                myBooking.map(bookList => 
                <li>Order Date: {bookList[1]} ----- Book: {bookList[0].name} ----- Author: {bookList[0].author} ----- Price : {bookList[0].price}</li>                   
                    
            )}              
        </div>
    );
};

export default Orders;