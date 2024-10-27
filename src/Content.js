import React, { useState } from "react";

const Content = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      checked: true,
      item: "One half bag of cocoa Covered almonds unsalted",
    },
    {
      id: 2,
      checked: false,
      item: "Item 2",
    },
    {
      id: 3,
      checked: false,
      item: "Item 3",
    },
  ]);

  const handleCheck = (id) => {
    // console.log(`key: ${id}`)
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
    // localStorage.setItem('shoppinglist'.JSON.stringify(listItems));
  };

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

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
  };

  return (
    <main>
      {/* <p onDoubleClick={handleClick}>Hello {name}!</p>
      <button onClick={handleNameChange}>Change Name</button>
      <button onClick={handleClick}>Click It</button>
      <button onClick={()=>{handleClick2('Alpha')}}>Click It name</button>
      <button onClick={(e)=>{handleClick3(e)}}>Click It Event</button> */}

        {items.length ? (

      <ul>
        {items.map((item) => (
          <li className="item" key={item.id}>
            <input
              type="checkbox"
              onChange={() => handleCheck(item.id)}
              checked={item.checked}
            />
            <label
              style={item.checked ? { textDecoration: "line-through" } : null}
              onDoubleClick={() => handleCheck(item.id)}
            >
              {item.item}
            </label>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    ): (
      <p style={{marginTop:'2rem'}}>Your list is Empty.</p>
    )}
    </main>
  );
};

export default Content;
