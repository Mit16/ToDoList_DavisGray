import Header from "./Header";
import SearchItem from "./SearchItem";
import AddItem from "./AddItem";
import Content from "./Content";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import apiRequest from "./apiRequest";

function App() {
  const API_URL = "http://localhost:3500/items";

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  //For generating error in case the link is not working or any other error
  const [fetchError, setFetchError] = useState(null);
  //as we are stimulating the RestAPI it takes some load time, so to show the load msg insted of empty list msg
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //You can directly put the above function async, it wouldn't work so to counter that problem we are creating another function so we can define it async and do the fetching task which takes time to be done
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Did not receive expected data");
        //await so this line wait for it to get executed before moving forward
        const listItems = await response.json();
        // console.log(listItems);
        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        // console.log(err.message);
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    // (async () => await fetchItems())();   //not need like this, make a simple call
    // fetchItem does not return a value.Therefore, this async IIFE(instantly invoked function expression) is not required. You can just make a call to fetchItems()

    // this API may not be as fast as the RestAPI in the local environment so stimulate that we are going to do this:
    setTimeout(() => {
      fetchItems();
    }, 2000);
  }, []);

  //API request is an async function
  //so we need to change add item to async function
  const addItem = async (item) => {
    //🔴 It's an bug here it is taking the id as string and concatinating 1 to it insted of adding to it
    //To solve that issue I have typecasted it into integer by parseInt() and then converted back it to the string as the JSON require a string not an integer
    const id = items.length ? String(parseInt(items[items.length - 1].id) + 1) : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);

    //Creating a POST request
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // The body contain the information that needed to be send
      //we don't need to send the full list of items, we just have to send the new item that has to be added
      body: JSON.stringify(myNewItem),
    };
    //sending the request
    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  };

  const handleCheck = async (id) => {
    // console.log(`key: ${id}`)
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);

    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: myItem[0].checked }),
    };
    //it will be somewhat different from the normal GET and POST Url
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  };

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    const deleteOptions = { method: "DELETE" };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    //addItem
    addItem(newItem);
    setNewItem("");
  };

  return (
    <div className="App">
      <Header title="Groceries Props" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />
      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
        {/* to prevent the content from loading if there's a error */}
        {!fetchError && !isLoading && (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
