let productList = [];
let flag = 0;
let stockQty = 50;
let priceHoddie = 1500;
let priceTshirt = 800;
let priceEmbrodery = 2000;
class Product {
  constructor(type, quantity, price, number) {
    this.name = type;
    this.qty = quantity;
    this.price = parseInt(price);
    this.id = number;
  }
}
const product1 = new Product("Buzo Sunflower", stockQty, priceHoddie, 0);
const product2 = new Product("Buzo Life", stockQty, priceHoddie, 0);
const product3 = new Product("Buzo Promisses", stockQty, priceHoddie, 0);
const product4 = new Product("Buzo Rainbow", stockQty, priceHoddie, 0);
const product5 = new Product("Buzo Cactus", stockQty, priceHoddie, 0);
const product6 = new Product("Buzo Deer", stockQty, priceHoddie, 0);
const product7 = new Product("Bolsa", stockQty - 30, 5000-priceHoddie, 0);
const product8 = new Product("AOT", stockQty - 40, priceEmbrodery, 0);
const product9 = new Product("Chihiro", stockQty - 40, priceEmbrodery, 0);
const product10 = new Product("Demon Slayer", stockQty - 40, priceEmbrodery, 0);
const product11 = new Product("Given", stockQty - 40, priceEmbrodery, 0);
const product12 = new Product("Amorfo", stockQty - 40, priceEmbrodery, 0);
let productList2 = [product1, product2, product3, product4, product5, product6, product7, product8, product9, product10, product11, product12];
//se agregan los productos al DOM
let insertProducts = document.getElementById('list');
productList2.forEach((product, idNumber) => {
  insertProducts.innerHTML += `
  <div class="card m-3  p-1 text-center" id="product${idNumber + 1}"style="width: 18rem;">

  <a id="text${idNumber + 1}"><img src="./Multimedia/product${idNumber + 1}.jpg"class="card-img-top" alt="..."></a>
 
  <div class="card-body">
    <h5 class="card-title"><strong>${product.name}</strong></h5>
    <p class="card-text">Precio: ${product.price} </p>
    <div class="dropdown">
<select  id="itemQty${idNumber + 1}" class="form-select form-select-sm text-center" aria-label=".form-select-sm example">
  <option selected>Cantidad</option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
</select>
<br>
</div>
    <a id="shop${idNumber + 1}"class="btn m-1 btn-warning" href="#">Comprar</a>
  </div>
  
</div>
`
})
//limpia todo el carrito
function clearList(){
  let limpiar = document.getElementById('clearAll');
  limpiar.addEventListener('click', () => {
    localStorage.clear();
    alert("se eliminaron todos los productos");
  })
}
//al hacer click en comprar se agrega el producto a la lista
productList2.forEach((item, idNumber) => {
  document.getElementById(`shop${idNumber + 1}`).addEventListener('click', () => {
    let itemQty = document.getElementById(`itemQty${idNumber + 1}`).value;
    if (itemQty != 'Cantidad') {
      productList.push(new Product(item.name, parseInt(itemQty), item.price, idNumber + 1));
      itemQty = document.getElementById(`itemQty${idNumber + 1}`);
      itemQty.innerHTML = `<option selected>Cantidad</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>`;
      if (productList.length > 0) {
        let buttons = document.getElementById('buttons');
        buttons.innerHTML = `<br><p class="text-center bg-success text-white fs-3">${item.name} agregado al carrito</p><a class="btn m-1 btn-dark" id="finalizar">finalizar compra</a><a class="btn m-1 btn-dark" href="" id="clearAll">Vaciar Carrito</a><br>`
        clearList();
        let end = document.getElementById('finalizar');
        end.addEventListener('click', () => {
          buttons.innerHTML = `<a class="btn m-1 btn-dark" href="" id="clearAll">Vaciar Carrito</a><br>`
          clearList();
          list();
          //flag controla que no se vuelva a escribir la lista
          if (flag == 0) {
            let finalPrice = 0;
            let productResume = JSON.parse(localStorage.getItem("Productos"));
            let insertProducts = document.getElementById('list');
            insertProducts.innerHTML = ""
            productResume.forEach((item, idNumber) => {
              finalPrice += item.price * item.qty;
              document.getElementById('finalPrice').innerHTML = `<p class="text-center p-2"id="produc${idNumber+1}">Total: ${finalPrice}</p><br><div><a class="btn m-2  p-2 btn-primary" href="https://www.mercadopago.com.ar/home" >Pagar</a>
              <a class="btn m-2  p-2 btn-primary" href=""  >Seguir Comprando</a></div>`;
              insertProducts.innerHTML += `<div class="card m-3  p-1 text-center" style="width: 18rem;">
              <a ><img src="./Multimedia/product${item.id}.jpg"class="card-img-top" alt="..."></a>
              <div class="card-body">
              <h5 class="card-title"><strong>${item.name}</strong></h5>
              <p class="card-text">Cantidad: ${item.qty} </p>
              <p class="card-text">Precio: ${item.price} </p>`
            })
          } flag = 1;
        })
      }
    }
  })
})
// busca en todo el array los productos con el mismo nombre y suma las cantidades para tener una cantidad final
function find(item) {
  let finalQty = 0;
  const filtered = productList.filter(producto => producto.name == item);
  for (const prod of filtered) {
    finalQty += prod.qty;
  }
  if (finalQty != 0) {
    return finalQty;
  }
}
//se agrega la lista final al local storage para despues consultarlo cuando haga click en finalizar
function list() {
  let products = JSON.parse(localStorage.getItem("Productos"));
  let prevProd;
  let productResume = [];
  let qty = 0;
  for (let i = 0; i < productList.length; i++) {
    if (i == 0) {
      prevProd = productList[i].id;
      qty = find(productList[i].name);
      productResume.push(new Product(productList[i].name, qty, productList[i].price, productList[i].id));
    }
    else {
      if (prevProd != productList[i].id) {
        qty = find(productList[i].name);
        productResume.push(new Product(productList[i].name, qty, productList[i].price, productList[i].id));
        prevProd = productList[i].id;
      }
    }
  }
  if (products) {
    products = products.concat(productResume);
    localStorage.setItem("Productos", JSON.stringify(products));
  } else {
    localStorage.setItem("Productos", JSON.stringify(productResume));
  }
}
