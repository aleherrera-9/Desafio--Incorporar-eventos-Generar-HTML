const priceHoddie = 1500;
const priceTshirt = 800;
const priceCap = 600;
let hoddieQty = 0;
let tshirtQty = 0;
let capQty = 0;
let prod1 = [];
let userList = [];
let active = 0;
let productList = [];
let productResume =[];
class Product {
    constructor(type, price, quantity) {
        this.name = type;
        this.price = parseInt(price);
        this.qty = quantity;
    }
}
//productos agregados con DOM
const product1 = new Product("Buzo Sunflower", 1500, 50);
const product2 = new Product("Buzo Life", 1300, 50);
const product3 = new Product("Buzo Promisses", 1450, 50);
const product4 = new Product("Buzo Rainbow", 1300, 50);
const product5 = new Product("Buzo Cactus", 1100, 50);
const product6 = new Product("Buzo Deer", 1100, 50);
const product7 = new Product("Bolsa", 500, 20);
const product8 = new Product("AOT", 2000, 10);
const product9 = new Product("Chihiro", 2000, 10);
const product10 = new Product("Demon Slayer", 2000, 10);
const product11 = new Product("Given", 2000, 10);
const product12 = new Product("Amorfo", 1500, 10);
let productList2 = [product1, product2, product3, product4, product5,product6,product7,product8,product9,product10,product11,product12];

let insertProducts = document.getElementById('list');
productList2.forEach((product, indice) => {
    insertProducts.innerHTML += `
  <div class="card m-3  p-1 text-center" id="product"style="width: 18rem;">
  <img src="./Multimedia/product${indice+1}.jpg"class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title"><strong>${product.name}</strong></h5>
    <p class="card-text">Precio: ${product.price} </p>
    <div class="dropdown">
 <button class="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
   Cantidad
 </button>
 <ul class="dropdown-menu m-1 text-center" aria-labelledby="dropdownMenuButton1">
   <li><a class="dropdown-item" href="">1</a></li>
   <li><a class="dropdown-item" href="">2</a></li>
   <li><a class="dropdown-item" href="">3</a></li>
   <li><a class="dropdown-item" href="">4</a></li>
   <li><a class="dropdown-item" href="">5</a></li>
   <li><a class="dropdown-item" href="">+</a></li>
 </ul>
 <p class="card-text m-1 ">In stock ${product.qty} </p>
</div>
    <a href="#" class="btn m-1 btn-warning">Comprar</a>
  </div>
</div>
    `
})
function options() {
    let menu = 0;
    do {
        menu = prompt("Bieveni@ a IBASHO, ingresa una opcion del menu:"
            + "\n 1-Iniciar compra"
            + "\n 2-Ver productos y stock");
        switch (menu) {
            case '1':
                addProducts();
                break;
            case '2':
                list();
                break;
            default:
                alert("no existe")

        }
    } while (menu != 1 && menu != 2);
}
function list(){
  productList2.forEach((product, indice)=>{
    console.log(` Item ${indice+1}: ${product.name}/Cantidad: ${product.qty}`)
})
}
//recibe la cantidad ingresada, devuelve la cantidad al new Product
function add(name) {
    let qty;
    do {
        qty = parseInt(prompt("Ingrese la cantidad deseada del producto"));
        if (!isNaN(qty)) {
            if (qty == 1) {
                alert("Se agrego " + qty + " item del producto " + name + " a la canasta");
            } else {
                alert("Se agregaron " + qty + " items del producto " + name + " a la canasta");
            }
            return qty;
        }
    } while (isNaN(qty))
}
function addProducts() {
    let flag = 0;
    let option;
    let menu = 0;
    do {
        do {
            let option = prompt("Ingresa una item a agregar:"
                + "\n 1-Buzo"
                + "\n 2-Remera"
                + "\n 3-Bolsa"
            );
            switch (option) {
                case '1':
                    prod1.push(new Product("Buzo", priceHoddie, add("Buzo")));
                    break;
                case '2':
                    prod1.push(new Product("Remera", priceTshirt, add("Remera")));
                    break;
                case '3':
                    prod1.push(new Product("Bolsa", priceCap, add("Bolsa")));
                    break;
                default:
                    alert("la opcion no es correcta");

            }
        } while (option == 1 || option == 2 || option == 3);

        do {
            menu = prompt("Ingrese una opcion"
                + "\n 1-Agregar un producto"
                + "\n 2-Finalizar Compra, ver carrito"
            );
            switch (menu) {
                case '1':
                    flag = 1;
                    break;
                case '2':
                    flag = 2;
                    all();
                    break;
                default:
                    alert("la opcion no es correcta");
            }
        } while (menu != 1 && menu != 2);

    } while (flag == 1 && flag != 2);
}
// busca en todo el array los productos con el mismo nombre y suma las cantidades para tener una cantidad final
function find(nameProduct) {
    let finalQty = 0;
    const filtered = prod1.filter(producto => producto.name == nameProduct);
    for (const prod of filtered) {
        finalQty += prod.qty;
    }
    if (finalQty != 0) {
        return finalQty;
    }
}
// muestra todos los productos agregados y el precio final si existe el array 
//guarda en productResume un array con los productos cargados independientemente si se cargo primero 1 y despues se agregaron mas, carga el total por item
//el array productResume se  guarda y sera utilizado mas adelante con eventos
function all() {
    let finalPrice = 0;
    if (prod1.length > 0) {
        console.log(prod1);
        hoddieQty = find("Buzo");
        if (hoddieQty > 0) {
            productResume.push(new Product("Buzo", priceHoddie, hoddieQty));
            console.log("Cantidad de Buzos: " + hoddieQty + "\nPrecio de unidad: " + priceHoddie);
            finalPrice += hoddieQty * priceHoddie;
        }
        tshirtQty = find("Remera");
        if (tshirtQty > 0) {
            productResume.push(new Product("Remera", priceTshirt, tshirtQty));
            console.log("Cantidad de Remeras: " + tshirtQty + "\nPrecio de unidad: " + priceTshirt);
            finalPrice += tshirtQty * priceTshirt;
        }
        capQty = find("Bolsa");
        if (capQty > 0) {
            productResume.push(new Product("Bolsa", priceCap, capQty));
            console.log("Cantidad de Bolsas: " + capQty + "\nPrecio de unidad: " + priceCap);
            finalPrice += capQty * priceCap;
        }
        alert("Gracias por elegirnos" + "\nPrecio final: " + finalPrice);
        console.log("precio final: " + finalPrice);
        localStorage.setItem("productResume",JSON.stringify(productResume))
    } else {
        alert("No se agregaron productos a la canasta");
    }
}
options();




