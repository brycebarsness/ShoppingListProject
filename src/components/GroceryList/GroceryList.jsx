import './GroceryList.css';

function GroceryList({groceryArray}){
    
return(
   
    <>
        <h1>Shopping List</h1>
        {groceryArray.map((grocery) =>(
        <div class = "block">
            <p>{grocery.name}</p>
            <p>{grocery.quantity}{grocery.unit}</p>
            <button id="buy">Buy</button>
            <button id="remove">Remove</button>
        </div>
             ))}
    </>
)

}

export default GroceryList

/* 
                <h1>Shopping List</h1>
                <button id="reset">Reset</button>
                <button id="clear">Clear</button>
                <br></br>
                <br></br>
                {groceryArray.map((grocery) => (
                    <div class="block">
                        <p>{grocery.name}</p>
                        <p>{grocery.quantity}{grocery.unit}</p>
                        <button id="buy">Buy</button>
                        <button id="remove">Remove</button>
                    </div>
                ))}
*/