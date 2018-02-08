let productsArray = [];
let productsId = 0;

module.exports = {
  getAll,
  createProduct,
  findItem,
  deleteItem

}

function getAll() {
  return productsArray;
}

function createProduct(data) {
  data.id = productsId++;
  productsArray.push(data);
  // console.log(productsArray);
  // console.log(productsArray.length)
}

function findItem(id) {
  id = parseInt(id);
  let index = productsArray.findIndex(element => element.id === id);
    if (index >= 0) {
      return productsArray[index]
  } else {
    return false;
  }
}

function deleteItem(id) {
  id = parseInt(id);
  let index = productsArray.findIndex(element => element.id === id)
  if (index >= 0) {
    productsArray.splice(index, 1);
    return true;
  }else{
    return false;
  }
}