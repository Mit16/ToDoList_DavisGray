// import React, { useState } from "react";

import ItemList from "./ItemList";

const Content = ({ items, handleCheck, handleDelete }) => {
  // const [name,setName] = useState('Alpha');
  // const [count,setCount]= useState(0);

  //  const handleNameChange = () =>{
  //   const names = ['Bob','Kevin','Dave'];
  //   const int = Math.floor(Math.random()*3);
  //   setName(names[int]);
  //  }

  //  const handleClick = () =>{
  //    setCount(count + 1);
  //   console.log(count);
  //  }

  //  const handleClick2 = (name) =>{
  //   console.log(`You Clicked it ${name}` );
  //  }

  //  const handleClick3 = (e) =>{
  //   // console.log(e);
  //   // console.log(e.target); //it gives the target jsx
  //   console.log(e.target.innerText);
  //  }

  return (
    <main>
      {/* <p onDoubleClick={handleClick}>Hello {name}!</p>
      <button onClick={handleNameChange}>Change Name</button>
      <button onClick={handleClick}>Click It</button>
      <button onClick={()=>{handleClick2('Alpha')}}>Click It name</button>
      <button onClick={(e)=>{handleClick3(e)}}>Click It Event</button> */}

      {items.length ? (
        <ItemList
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <p style={{ marginTop: "2rem" }}>Your list is Empty.</p>
      )}
    </main>
  );
};

export default Content;
