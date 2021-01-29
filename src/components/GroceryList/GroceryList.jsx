import './GroceryList.css';

function GroceryList({groceryArray, deleteItem, setPurchased, deleteShoppingHistory, resetShoppingCart}){
    
return(
    <>
        <h1>Shopping List</h1>
        <button id="reset" onClick = {() => resetShoppingCart()}>Reset</button>
        <button id="clear" onClick= {() => deleteShoppingHistory()}>Clear</button>
        <br />
        {groceryArray.map((grocery) =>(
        <div class = {grocery.purchased? "block2":"block1"}>
            <p>{grocery.name}</p>
            <p>{grocery.quantity}{grocery.unit}</p>
            {grocery.purchased ? 
            <p>Purchased</p> :
            <div> 
            <button id="buy" onClick = {() => setPurchased(grocery.id)}>Buy</button>
            <button id="remove" onClick= {() => deleteItem(grocery.id)}>Remove</button>
            </div>
            }
        </div>
             ))}
    </>)}

export default GroceryList;