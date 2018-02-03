let productsArray = [];
let productsId = 0;

module.exports = {
  getAll,
  createProduct,
  findItem

}

function getAll() {
  return productsArray;
}

function createProduct(data) {
  data.id = productsId++;
  productsArray.push(data);
  console.log(productsArray);
  console.log(productsArray.length)
}

function findItem(id) {
  id = parseInt(id);
  let index = productsArray.findIndex(element => element.id === id);
    if (index >= 0) {
      console.log(index);
      return productsArray[index]

  } else {
    return false;
  }
}
