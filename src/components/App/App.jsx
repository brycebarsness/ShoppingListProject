import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../Header/Header.jsx'
import './App.css';
import axios from 'axios';
import GroceryList from '../GroceryList/GroceryList.jsx';
import AddItemForm from '../AddItemForm/AddItemForm';


function App() {
    let [groceryArray, setGroceryArray] = useState([]);
    //these are used in the form
    let [newItemName, setNewItemName] = useState('');
    let [newItemQuantity, setNewItemQuantity] = useState(0);
    let [newItemUnit, setNewItemUnit] = useState('');
    // On Load, do this thing
    useEffect(() => {
        console.log('in useEffect')
        fetchGroceries();
    }, []);

    //DELETE request
    const deleteItem = (itemId) => {

        axios({
            method: 'DELETE',
            url: `/list/delete${itemId}`
        }).then((response) => {
            fetchGroceries();
        })
    }

    //POSTS request
    const addItem = (event) => {
        event.preventDefault();
        axios({
            method: 'POST',
            url: '/list',
            data: {
                name: newItemName,
                quantity: newItemQuantity,
                unit: newItemUnit
            }
        }).then((response) => {
            fetchGroceries();
            setNewItemName('');
            setNewItemQuantity(0);
            setNewItemUnit('');
        })
    }

    // GET request
    const fetchGroceries = () => {
        axios.get('/list').then((response) => {
            console.log('This is the Grocery List From Database', response.data);
            setGroceryArray(response.data);
        }).catch((error) => {
            console.log(error)
        })}

    //put request
    const setPurchased = (itemId) => {
        console.log(`Purchased Item`, itemId);
        axios({
            method: 'PUT',
            url: `/list/buy/${itemId}`,
        }).then((response) => {
            fetchGroceries();
        })
    }

    //resets all items from purchased from true to false
    const resetShoppingCart = () => {
        axios({
            method: 'PUT',
            url: `/list/reset`
        }).then((response) => {fetchGroceries();}
        )
    }
    //
    const deleteShoppingHistory = () => {
    console.log("Deleting Shopping History");
    axios
      .delete(`/list/clear`)
      .then((response) => {
        fetchGroceries();
      })
      .catch((err) => {
        console.log(err);
      });
  }; 


    return (
        <div className="App">
            <main>
            <Header />
            <AddItemForm 
                addItem={addItem}
                newItemName={newItemName}
                setNewItemName={setNewItemName}
                newItemQuantity={newItemQuantity}
                setNewItemQuantity={setNewItemQuantity}
                newItemUnit={newItemUnit}
                setNewItemUnit={setNewItemUnit}
            />
            <GroceryList 
            groceryArray={groceryArray}
            deleteItem={deleteItem}
            setPurchased={setPurchased}
            deleteShoppingHistory={deleteShoppingHistory}
            resetShoppingCart={resetShoppingCart}
            />

            
            </main>
        </div>
    );
}

export default App;
