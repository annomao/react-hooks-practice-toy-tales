import React, {useState} from "react";
import { v4 as uuid } from 'uuid';

function ToyForm({onAddToy}) {
  const[newToy, setNewToy] = useState({
    id:uuid(),
    name: "",
    image:"",
    likes: 0
  })

  function handleChange(event){
    setNewToy({
      ...newToy,
      [event.target.name] : event.target.value
    })
  }

  function handleSubmit(event){
    event.preventDefault()
    fetch("http://localhost:3001/toys",{
      method:"POST",
      headers:{
        "Content-type" : "Application/json"
      },
      body:JSON.stringify(newToy)
    })
    .then(res => res.json())
    .then(data => onAddToy(data))
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          onChange={handleChange}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
