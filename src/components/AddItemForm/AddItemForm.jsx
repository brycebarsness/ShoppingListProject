import './AddItemForm.css';
function addItemForm(props) {
    if (props.editMode === false) {
        return (
            <form onSubmit={props.addItem}>
                <div class="form-text" class="mb-3">
                <label class="form-label" htmlFor="itemInput">Item: </label>
                <input class="form-control" id="itemNameInput" value={props.newItemName} onChange={(event) => { props.setNewItemName(event.target.value) }}
                    required></input>
                <label class="form-label" htmlFor="quantityInput">Quantity: </label>
                <input class="form-control" id="quantityInput" value={props.newItemQuantity} onChange={(event) => { props.setNewItemQuantity(event.target.value) }} required></input>
                <label class="form-label" htmlFor="unitInput">Unit: </label>
                <input class="form-control" id="unitInput" value={props.newItemUnit} onChange={(event) => { props.setNewItemUnit(event.target.value) }} required></input>
                <button class="btn btn-primary" type="submit">Save</button>
                </div>
            </form>
        );
    }
    else if (props.editMode === true) {
        return (
        <form onSubmit={props.updateItem}>
            <div class="form-text" class="mb-3">
            <label class="form-label" htmlFor="itemInput">Item: </label>
            <input class="form-control" id="itemNameInput" value={props.newItemName} onChange={(event) => { props.setNewItemName(event.target.value) }}
                required></input>
            <label class="form-label" htmlFor="quantityInput">Quantity: </label>
            <input class="form-control" id="quantityInput" value={props.newItemQuantity} onChange={(event) => { props.setNewItemQuantity(event.target.value) }} required></input>
            <label class="form-label"htmlFor="unitInput">Unit: </label>
            <input class="form-control"  id="unitInput" value={props.newItemUnit} onChange={(event) => { props.setNewItemUnit(event.target.value) }} required></input>
            <button class="btn btn-primary" type="submit">Save</button></div>
        </form>
        )
    }

}

export default addItemForm;

//TODO addItem pass in as props
