import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../Header/Header.jsx'
import './App.css';
import axios from 'axios';
import GroceryList from '../GroceryList/GroceryList.jsx';


function App() {
    let [groceryArray, setGroceryArray] = useState([]);
    // On Load, do this thing
    useEffect(() => {
        console.log('in useEffect')
        fetchGroceries();
    }, []);

    // GET request
    const fetchGroceries = () => {
        axios.get('/list').then((response) => {
            console.log('This is the Grocery List From Database', response.data);
            setGroceryArray(response.data);
        }).catch((error) => {
            console.log(error)
        })}
 
    return (
        <div className="App">
            <Header />
            <main>
                <p>Under Construction...</p>
                <h1>Shopping List</h1>
                <button id="reset">Reset</button>
                <button id="clear">Clear</button>
             
                {groceryArray.map((grocery) => (
                    <div class="block">
                        <p>{grocery.name}</p>
                        <p>{grocery.quantity}{grocery.unit}</p>
                        <button id="buy">Buy</button>
                        <button id="remove">Remove</button>
                    </div>
                ))}
            
            </main>
        </div>
    );
}

export default App;
