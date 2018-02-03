const db = require('./db/products')


module.exports = {
  validateProduct,
  edit,
  validatePut
}

function validateProduct(data) {
  let isValid;
  const errors = {
    nameError: '',
    priceError: '',
    inventoryError: ''
  }

  if (typeof data.name !== 'string') {
    isValid = false;
    errors.nameError = "Name should be a string. "
  }
  if (isNaN(data.price)) {
    isValid = false;
    errors.priceError += "Price should be a number. "
  }
  if (data.price <= 0) {
    isValid = false;
    errors.priceError += "Price should be more than 0. "
  }
  if (isNaN(data.inventory)) {
    isValid = false;
    errors.inventoryError += 'Inventory should be a number. '
  }
  if (data.inventory < 0) {
    isValid = false;
    errors.inventoryError += 'Inventory should not be negative. '
  }
  if (isValid === false) {
    return errors
  } else {
    isValid = true
    return true
  }
}

function validatePut(data) {
  let isValid;
  const errors = {}

  if (data.name !== undefined) {
    if (typeof data.name !== 'string') {
      isValid = false;
      errors.nameError = "Name should be a string. "
    }
  }
  if (data.price !== undefined) {
    if (isNaN(Number(data.price))) {
      isValid = false;
      errors.priceError = "Price should be a number. "
    }
    if (data.price <= 0) {
      isValid = false;
      errors.priceError = "Price should be more than 0. "
    }
  }
  if (data.inventory !== undefined) {
    if (isNaN(Number(data.inventory))) {
      isValid = false;
      errors.inventoryError = 'Inventory should be a number. '
    }
    if (Number(data.inventory) < 0) {
      isValid = false;
      errors.inventoryError = 'Inventory should not be negative. '
    }
  }
  if (isValid === false || undefined) {
    console.log(isValid);
    return errors
  } else {
    console.log('first', isValid);
    isValid = true
    console.log(isValid)
    return true
  }
}

function edit(id, item) {
  let itemToEdit = db.findItem(id);
  let isValid;
  if (item.name || item.price || item.inventory) {
    if (item.name) {
      console.log('item name', item.name)
      itemToEdit.name = item.name;
      isValid = true;
    }
    if (item.price) {
      itemToEdit.price = Number(item.price);
      isValid = true;
    }
    if (item.inventory) {
      itemToEdit.inventory = Number(item.inventory);
      isValid = true;
    }
  } else {
    isValid = false;
  }
  return isValid;
}