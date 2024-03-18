// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
const products = [
  {
    id: 1,
    name: 'cooking oil',
    price: 10.5,
    type: 'grocery',
    offer: {
      number: 3,
      percent: 20,
    },
  },
  {
    id: 2,
    name: 'Pasta',
    price: 6.25,
    type: 'grocery',
  },
  {
    id: 3,
    name: 'Instant cupcake mixture',
    price: 5,
    type: 'grocery',
    offer: {
      number: 10,
      percent: 30,
    },
  },
  {
    id: 4,
    name: 'All-in-one',
    price: 260,
    type: 'beauty',
  },
  {
    id: 5,
    name: 'Zero Make-up Kit',
    price: 20.5,
    type: 'beauty',
  },
  {
    id: 6,
    name: 'Lip Tints',
    price: 12.75,
    type: 'beauty',
  },
  {
    id: 7,
    name: 'Lawn Dress',
    price: 15,
    type: 'clothes',
  },
  {
    id: 8,
    name: 'Lawn-Chiffon Combo',
    price: 19.99,
    type: 'clothes',
  },
  {
    id: 9,
    name: 'Toddler Frock',
    price: 9.99,
    type: 'clothes',
  },
];

// => Reminder, it's extremely important that you debug your code.
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster.
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
const cart = [];

let total = 0;

// Elements
const cartList = document.getElementById('cart_list');

// Exercise 1
function buy(id) {
  const productIndex = products.findIndex((product) => product.id === id);
  const cartProductIndex = cart.findIndex(
    (cartProduct) => cartProduct.id === id
  );

  if (cartProductIndex != -1) {
    cart[cartProductIndex].quantity += 1;
    cart[cartProductIndex].subtotal =
      cart[cartProductIndex].price * cart[cartProductIndex].quantity;
  } else {
    cart.push(products[productIndex]);
    cart[cart.length - 1].quantity = 1;
    cart[cart.length - 1].subtotal = cart[cart.length - 1].price; // Crear la propiedad subtotal para después poder operar con el precio total sin modificar el precio original.
  }
  refreshCart();
}

const refreshCart = () => {
  applyPromotionsCart();
  calculateTotal();
  printCart();
};

// Exercise 2
function cleanCart() {
  const cartLength = cart.length;
  for (let i = 0; i < cartLength; i++) {
    cart.pop();
  }
  total = 0;
  refreshCart();
}

// Exercise 3
function calculateTotal() {
  total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].subtotal;
  }
}

// Exercise 4
function applyPromotionsCart() {
  // Apply promotions to each item in the array "cart"
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].quantity >= 10) {
      cart[i].subtotal *= 0.7; // Descuento del 30%
    } else if (cart[i].quantity >= 3) {
      cart[i].subtotal *= 0.8; // Descuento del 20%
    }
  }
}

// Exercise 5
function printCart() {
  cartList.innerHTML = '';
  for (let i = 0; i < cart.length; i++) {
    /* Crear tabla:
        <tr>
            <th scope="row">Nombre producto</th>
            <td>Precio</td>
            <td><button removeFromCart(id)>Cantidad<button buy(id)></td>
        </tr> 
    */
    let tableRow = document.createElement('tr');

    let productName = document.createElement('th');
    productName.scope = 'row';
    productName.innerHTML = cart[i].name;

    let price = document.createElement('td');
    price.innerHTML = cart[i].price.toFixed(2) + '€';

    let removeBtn = document.createElement('button');
    removeBtn.classList = 'btn btn-link text-decoration-none';
    removeBtn.addEventListener('click', () => removeFromCart(cart[i].id));
    removeBtn.innerHTML = '-';

    let addBtn = document.createElement('button');
    addBtn.classList = 'btn btn-link text-decoration-none';
    addBtn.addEventListener('click', () => buy(cart[i].id));
    addBtn.innerHTML = '+';

    let quantity = document.createElement('span');
    quantity.innerHTML = cart[i].quantity;

    let quantityTableData = document.createElement('td');
    quantityTableData.classList = 'text-nowrap';
    quantityTableData.appendChild(removeBtn);
    quantityTableData.appendChild(quantity);
    quantityTableData.appendChild(addBtn);

    let totalProduct = document.createElement('td');
    totalProduct.innerHTML = cart[i].subtotal.toFixed(2) + '€'

    tableRow.appendChild(productName);
    tableRow.appendChild(price);
    tableRow.appendChild(quantityTableData);
    tableRow.appendChild(totalProduct);
    cartList.appendChild(tableRow);
  }

  // Modificar el número de productos en el botón Cart de arriba a la derecha.
  let totalQuantity = 0;
  for (let i = 0; i < cart.length; i++) {
    totalQuantity += cart[i].quantity;
  }
  document.getElementById('count_product').innerHTML = totalQuantity;
  // Dibuja el precio total en el modal.
  document.getElementById('total_price').innerHTML = total.toFixed(2);
}

// ** Nivell II **

// Exercise 7
function removeFromCart(id) {
  let index = cart.findIndex((product) => product.id == id);

  if (cart[index].quantity == 1) {
    cart.splice(index, 1);
  } else {
    cart[index].quantity -= 1;
    cart[index].subtotal =
      cart[index].price * cart[index].quantity;
  }

  refreshCart();
}

function open_modal() {
  printCart();
}
