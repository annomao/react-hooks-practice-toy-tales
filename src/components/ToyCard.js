import React from "react";

function ToyCard({toy,onDeleteToy,onUpdateToy}) {

  function handleDelete(){
    fetch(`http://localhost:3001/toys/${toy.id}`,{
      method:"DELETE"
    })
    .then(res => res.json())
    .then(()=> onDeleteToy(toy))
  }

  function handleLikes(){
    const updatedLikes = parseInt(toy.likes) + 1
    fetch(`http://localhost:3001/toys/${toy.id}`,{
      method:"PATCH",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({likes:updatedLikes})
    })
    .then(res => res.json())
    .then(updatedToy => onUpdateToy(updatedToy))
  }

  return (
    <div className="card">
      <h2>{toy.name}</h2>
      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
      />
      <p>{toy.likes} Likes </p>
      <button className="like-btn" onClick={handleLikes}>Like {"<3"}</button>
      <button className="del-btn" onClick={handleDelete}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
