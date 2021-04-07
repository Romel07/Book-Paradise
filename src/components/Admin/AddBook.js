import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import {
  Link
} from "react-router-dom";

const Admin = () => {
  const { register, handleSubmit, errors } = useForm();
  const [imageURL, setImageURL] = useState(null)

  const handleImageUpload = event => {
    console.log(event.target.files[0]);
    const imageData = new FormData();
    imageData.set('key', 'b80fddd44f7eb65e24aefe751043d7aa');
    imageData.append('image', event.target.files[0])
    axios.post('https://api.imgbb.com/1/upload', imageData)
      .then(function (response) {
        setImageURL(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const onSubmit = data => {
    const bookData = {
      name: data.name,
      author: data.author,
      price: data.price,
      imageURL: imageURL
    };
    const url = `https://gentle-everglades-73994.herokuapp.com/addBooks`;
    console.log(bookData);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    })

  };


  return (
    <div>
      

      <h3>Add Book with this Form :</h3>
      <button><Link to="/admin">Add Book to Inventory</Link></button><button><Link to="/managebook">Manage/Delete Book from Inventory</Link></button><br/><br/>
      <form onSubmit={handleSubmit(onSubmit)}>

        Book Name : <input name="name" defaultValue="Book" ref={register({ required: true })} />
        <br /><br />
                Author : <input name="author" placeholder='Author' ref={register({ required: true })} />
        <br /><br />
        Price : <input name="price" type='number' placeholder='$ Price' ref={register({ required: true })} />
        <br /><br />
                Upload File : <input type="file" name="image" id="" onChange={handleImageUpload} />
        {errors.exampleRequired && <span>This field is required</span>}
        <br /><br />

        <input value="Upload to Sever" type="submit" />
      </form>

    </div>
  );
};

export default Admin;