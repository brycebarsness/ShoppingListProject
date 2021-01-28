import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../Header/Header.jsx'
import './App.css';
import axios from 'axios';


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
            </main>
        </div>
    );
}

export default App;
