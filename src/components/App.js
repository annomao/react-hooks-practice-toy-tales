import React, { useState,useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys , setToys] = useState([])

  useEffect(()=>{
    fetch("http://localhost:3001/toys")
    .then(res=>res.json())
    .then(data => setToys(data))
  },[])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleAddToy(toy){
    setToys([...toys,toy])
  }

  function handleDeleteToy(deletedToy){
    const newToyList = toys.filter((toy)=> toy.id !== deletedToy.id)
    setToys(newToyList)
  }

  function handleUpdateToy(updatedToy){
    const newToyList = toys.map((toy)=>{
      if(toy.id === updatedToy.id){
        return updatedToy
      }
      return toy
    })
    setToys(newToyList)
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onDeleteToy={handleDeleteToy} onUpdateToy={handleUpdateToy}/>
    </>
  );
}

export default App;
