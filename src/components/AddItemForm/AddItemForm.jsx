import './AddItemForm.css';
function addItemForm(props) {

    return(
        <form onSubmit={props.addItem}>
            <label htmlFor="itemInput">Item: </label>
            <input id="itemNameInput" value={props.newItemName} onChange={(event) =>{props.setNewItemName(event.target.value)}}
            required></input><br />
            <label htmlFor="quantityInput">Quantity: </label>
            <input id="quantityInput" value={props.newItemQuantity} onChange={(event) =>{props.setNewItemQuantity(event.target.value)}} required></input> 
            <label htmlFor="unitInput">Unit: </label>
            <input id="unitInput" value={props.newItemUnit} onChange={(event) =>{props.setNewItemUnit(event.target.value)}} required></input><br /> 
            <button type="submit">Save</button>
        </form>
    );
}

export default addItemForm;

//TODO addItem pass in as props
//newItem props