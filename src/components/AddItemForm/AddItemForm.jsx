function addItemForm(props) {

    return(
        <form onSubmit={props.addItem}>
            <label htmlFor="itemInput">Item:</label>
            <input id="itemNameInput" value={props.newItemName}
            required></input>
            <label htmlFor="quantityInput">Quantity</label>
            <input id="quantityInput" value={props.newItemQuantity} required></input> 
            <label htmlFor="unitInput">Unit</label>
            <input id="unitInput" value={props.newItemUnit} required></input> 
            <button type="submit">Save</button>
        </form>
    );
}

export default addItemForm;

//TODO addItem pass in as props
//newItem props