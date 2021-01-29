import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../Header/Header.jsx'
import './App.css';
import Swal from 'sweetalert2'
import axios from 'axios';
import GroceryList from '../GroceryList/GroceryList.jsx';
import AddItemForm from '../AddItemForm/AddItemForm';


function App() {
    let [groceryArray, setGroceryArray] = useState([]);
    //these are used in the form
    let [newItemName, setNewItemName] = useState('');
    let [newItemQuantity, setNewItemQuantity] = useState('');
    let [newItemUnit, setNewItemUnit] = useState('');
    let [editMode, setEditMode] = useState(false);
    let [idOfItem, setIdOfItem] = useState(0);

    // On Load, do this thing
    useEffect(() => {
        fetchGroceries();
    }, []);

    //DELETE request
    const deleteItem = (itemId) => {
        Swal.fire({
            title: 'Are you sure you want to delete this item?',
            text: "this change cannot be undone ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete this item!'
          })
        .then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/list/delete${itemId}`).then(response => {
               fetchGroceries();
                })
        .catch(error => {
                    console.log(error);
                })
                // alert for successful delete
              Swal.fire(
                'Deleted!',
                'Your item has been deleted.',
                'success'
              )
            }
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
            setGroceryArray(response.data);
        }).catch((error) => {
            console.log(error)
        })
    }

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
        }).then((response) => { fetchGroceries(); }
        )
    }
    // delete all shopping history
    const deleteShoppingHistory = () => {
         Swal.fire({
            title: 'Are you sure you want to delete all your items?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it! '
            }).then((result) => {
                if (result.isConfirmed){ 
             axios.delete(`/list/clear`)
            .then((response) => {
            fetchGroceries();
            })
            .catch((err) => {
                console.log(err);
            });
              Swal.fire(
                'Deleted!',
                'All items have been deleted.',
                'success'
              )
            }
          })
        }
    

    //edit an item
    const getOneItem = (groceryId) => {
        console.log("editing an item", groceryId);
        setEditMode(true);
        axios.get(`/list/${groceryId}`).then((response) => {
            setNewItemName(response.data[0].name);
            setNewItemQuantity(response.data[0].quantity);
            setNewItemUnit(response.data[0].unit);
        }).catch((error) => {
            console.log(error)
        });
    };

    //update an existing item after editing
    const updateItem = (event) => {
        event.preventDefault();
        console.log(`updating Item`, idOfItem);
        axios({
            method: 'PUT',
            url: `/list/update/${idOfItem}`,
            data: {
                name: newItemName,
                quantity: newItemQuantity,
                unit: newItemUnit
            }
        }).then((response) => {
            setEditMode(false);
            fetchGroceries();
            setNewItemName('');
            setNewItemQuantity(0);
            setNewItemUnit('');
        })
    }

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
                    editMode={editMode}
                    setEditMode={setEditMode}
                    updateItem={updateItem}
                    setIdOfItem={setIdOfItem}
                    idOfItem={idOfItem}

                />
                <GroceryList
                    groceryArray={groceryArray}
                    deleteItem={deleteItem}
                    setPurchased={setPurchased}
                    deleteShoppingHistory={deleteShoppingHistory}
                    resetShoppingCart={resetShoppingCart}
                    getOneItem={getOneItem}
                    editMode={editMode}
                    setIdOfItem={setIdOfItem}
                />


            </main>
        </div>
    );
}

export default App;
