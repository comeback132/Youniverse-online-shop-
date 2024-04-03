//Navigation menu
function toggleNavigationIfSmallScreen() {
  const mediaQuery = window.matchMedia('(max-width: 620px)');
  const navLinks = document.getElementById("nav");
  const body = document.getElementById("all-info");

  if (mediaQuery.matches) {
    if (navLinks.style.display === "none" || navLinks.style.display === "") {
      navLinks.style.display = "flex";
      body.style.filter = "blur(5px)";
    } else {
      navLinks.style.display = "none";
      body.style.filter = "none";
    }
  }
}
const hamburger = document.getElementById("icon");
hamburger.addEventListener("click", toggleNavigationIfSmallScreen)
function setupNavigation() {
  const mediaQuery = window.matchMedia('(max-width: 620px)');
  const navLinks = document.getElementById("nav");
  const body = document.getElementById("all-info");

  if (mediaQuery.matches) {
    navLinks.style.display = "none";
    body.style.filter = "none";
  } else {
    navLinks.style.display = "flex";
    body.style.filter = "none";
  }
}
window.addEventListener('resize', setupNavigation);

//Cart
const cartOpenBtn = document.getElementById("cart");
const shopCart = document.getElementById("sidecart");
const removeCartBtn = document.getElementById("close-btn");
const backdrop = document.querySelector(".backdrop");
const itemsNum = document.getElementById("items-num");
const subtotalPrice=document.getElementById("subtotal-price");

cartOpenBtn.addEventListener('click', function (event) {
  event.preventDefault();
  openCart();
});
removeCartBtn.addEventListener('click', function (event) {
  event.preventDefault();
  closeCart();
});
backdrop.addEventListener('click', function (event) {
  event.preventDefault();
  closeCart();
});

function openCart() {
  shopCart.classList.add('open');
  backdrop.classList.add('show');
}
function closeCart() {
  shopCart.classList.remove('open');
  backdrop.classList.remove('show');
}
const ITEMS = [
  {
    id: 1,
    name: 'Andromeda',
    price: 120,
    category: 'Galaxies',
    image: 'img/andromed-item.png',
    qty: 1
  },
  {
    id: 2,
    name: 'Jupiter',
    price: 20,
    category: 'Planets',
    image: 'img/jupiter-item.png',
    qty: 1
  },
  {
    id: 3,
    name: 'Bode`s',
    price: 100,
    category: 'Galaxies',
    image: 'img/bodes-item.png',
    qty: 1
  },
  {
    id: 4,
    name: 'Earth',
    price: 10,
    category: 'Planets',
    image: 'img/earth-item.png',
    qty: 1
  },
  {
    id: 5,
    name: 'Milky Way',
    price: 130,
    category: 'Galaxies',
    image: 'img/milky-way-item.png',
    qty: 1
  },
  {
    id: 6,
    name: 'Mars',
    price: 10,
    category: 'Planets',
    image: 'img/mars-item.png',
    qty: 1
  },
  {
    id: 7,
    name: 'Moon',
    price: 10,
    category: 'Accessories',
    image: 'img/moon-item.png',
    qty: 1
  },
  {
    id: 8,
    name: 'Venus',
    price: 120,
    category: 'Planets',
    image: 'img/venus-item.png',
    qty: 1
  },
  {
    id: 9,
    name: 'Saturn',
    price: 120,
    category: 'Planets',
    image: 'img/saturn-item.png',
    qty: 1
  },
  {
    id: 10,
    name: 'Triangulum',
    price: 120,
    category: 'Galaxies',
    image: 'img/triangulum-item.png',
    qty: 1
  },
  {
    id: 11,
    name: 'Sun',
    price: 120,
    category: 'Stars',
    image: 'img/sun-item.png',
    qty: 1
  }
];
const itemsElement = document.querySelector(".all-items-cards");
let cartData = [
];
function addItem(filteredIdx, itemId) {
  const filteredItem = filteredItems[filteredIdx]; // Use the filteredItems array
  const foundedItem = cartData.find(
    (item) => item.id.toString() === itemId.toString()
  );

  if (foundedItem) {
    increaseQty(itemId);
  } else {
    cartData.push(filteredItem); // Use the filtered item
  }

  updateCart();
  openCart();
  updateLocalStorage();
}
function removeCartItem(itemId) {
  cartData = cartData.filter(item => item.id != itemId);
  updateCart();
  updateLocalStorage();
}
function increaseQty(itemId) {
  cartData = cartData.map(
    (item) => item.id.toString() === itemId.toString() ?
      { ...item, qty: item.qty + 1 } : item
  )
  updateCart();
  updateLocalStorage();
}
function decreaseQty(itemId) {
  cartData = cartData.map(
    (item) => item.id.toString() === itemId.toString() ?
      { ...item, qty: item.qty > 1 ? item.qty - 1 : item.qty } : item
  )
  updateCart();
  updateLocalStorage();
}
function calcItemsNum() {
  let itemsCount = 0
  cartData.forEach((item) => (itemsCount += item.qty));
  itemsNum.innerText = itemsCount;
}
function calcSubtotalPrice(){
  let subtotal=0
  cartData.forEach((item)=>(subtotal+=item.price*item.qty));
  subtotalPrice.innerText=subtotal
}
function renderItems() {
  if (!itemsElement) {
    console.warn("Element with class 'all-items-cards' not found on this page.");
    return;
  }
  ITEMS.forEach((item, idx) => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('item-card');

    const addButton = document.createElement('a');
    addButton.classList.add('add-btn');
    addButton.onclick = () => addItem(idx, item.id);
    
    const addIcon = document.createElement('img');
    addIcon.classList.add('add-icon');
    addIcon.src = 'img/add-icon.png';
    addIcon.alt = 'add';
    addButton.appendChild(addIcon);

    const imgElement = document.createElement('img');
    imgElement.src = item.image;
  

    const captionElement = document.createElement('figcaption');
    captionElement.classList.add('item-card-caption');
    
    const nameParagraph = document.createElement('p');
    nameParagraph.textContent = item.name;
  
    const priceParagraph = document.createElement('p');
    priceParagraph.textContent = `${item.price}$`;
  
    const categoryParagraph = document.createElement('p');
    categoryParagraph.classList.add('category-name');
    categoryParagraph.textContent = item.category;
  
    addButton.appendChild(addIcon);
    captionElement.appendChild(nameParagraph);
    captionElement.appendChild(priceParagraph);
    captionElement.appendChild(categoryParagraph);
  
    itemElement.appendChild(addButton);
    itemElement.appendChild(imgElement);
    itemElement.appendChild(captionElement);
  
    itemsElement.appendChild(itemElement);
  });
  
}
const cartItems = document.querySelector('.cart-items');
function renderCartItems() {
  cartItems.innerHTML = '';

  cartData.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart_item');

    const removeButton = document.createElement('div');
    removeButton.classList.add('remove_item');
    removeButton.onclick = () => removeCartItem(item.id);
    const removeIcon = document.createElement('span');
    removeIcon.textContent = '×';
    removeButton.appendChild(removeIcon);

    const imgElement = document.createElement('div');
    imgElement.classList.add('item_img');
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = '';
    imgElement.appendChild(img);

    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('cart_item_details');

    const itemName = document.createElement('p');
    itemName.textContent = item.name;

    const itemPrice = document.createElement('strong');
    itemPrice.textContent = `$${item.price}`;

    const qtyContainer = document.createElement('div');
    qtyContainer.classList.add('qty');

    const decreaseButton = document.createElement('span');
    decreaseButton.textContent = '-';
    decreaseButton.onclick = () => decreaseQty(item.id);

    const qtyValue = document.createElement('strong');
    qtyValue.textContent = item.qty;

    const increaseButton = document.createElement('span');
    increaseButton.textContent = '+';
    increaseButton.onclick = () => increaseQty(item.id);

    qtyContainer.appendChild(decreaseButton);
    qtyContainer.appendChild(qtyValue);
    qtyContainer.appendChild(increaseButton);

    detailsContainer.appendChild(itemName);
    detailsContainer.appendChild(itemPrice);
    detailsContainer.appendChild(qtyContainer);

    cartItem.appendChild(removeButton);
    cartItem.appendChild(imgElement);
    cartItem.appendChild(detailsContainer);

    cartItems.appendChild(cartItem);
  });
}
function updateCart() {
  renderCartItems();
  calcItemsNum();
  calcSubtotalPrice();
}
renderItems();
renderCartItems();
//Filtering and Searching
let filteredItems = [...ITEMS];
const searchInput = document.getElementById("searchItem");
if (searchInput) {
  searchInput.addEventListener("input", function () {
    const searchQuery = searchInput.value.toLowerCase();
    filteredItems = ITEMS.filter(item =>
      item.name.toLowerCase().includes(searchQuery)
    );
    updateDisplayedItems(filteredItems);
  });  
}
const categoryList = document.getElementById("categoryList");
if (categoryList) {
  categoryList.addEventListener("click", function (event) {
    if (event.target.classList.contains("category-item")) {
      const selectedCategory = event.target.innerText;
      filteredItems = ITEMS.filter(item =>
        item.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      updateDisplayedItems(filteredItems);
    }
  });  
}
//Slider
const slider = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");
if (slider&&priceValue) {
  priceValue.innerHTML = slider.value;
  slider.oninput = function () {
  priceValue.innerHTML = this.value;
  }
  slider.addEventListener("input", function () {
    const selectedPrice = parseInt(slider.value, 10);
    filteredItems = ITEMS.filter(item => item.price <= selectedPrice);
    updateDisplayedItems(filteredItems);
  });
}
function updateDisplayedItems(items) {
  const itemsElement = document.querySelector(".all-items-cards");
  itemsElement.innerHTML = ""; 

  items.forEach((item, idx) => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('item-card');

    const addButton = document.createElement('a');
    addButton.classList.add('add-btn');
    addButton.onclick = () => addItem(idx, item.id);
    
    const addIcon = document.createElement('img');
    addIcon.classList.add('add-icon');
    addIcon.src = 'img/add-icon.png';
    addIcon.alt = 'add';
    addButton.appendChild(addIcon);

    const imgElement = document.createElement('img');
    imgElement.src = item.image;

    const captionElement = document.createElement('figcaption');
    captionElement.classList.add('item-card-caption');
    
    const nameParagraph = document.createElement('p');
    nameParagraph.textContent = item.name;

    const priceParagraph = document.createElement('p');
    priceParagraph.textContent = `${item.price}$`;

    const categoryParagraph = document.createElement('p');
    categoryParagraph.classList.add('category-name');
    categoryParagraph.textContent = item.category;

    addButton.appendChild(addIcon);
    captionElement.appendChild(nameParagraph);
    captionElement.appendChild(priceParagraph);
    captionElement.appendChild(categoryParagraph);

    itemElement.appendChild(addButton);
    itemElement.appendChild(imgElement);
    itemElement.appendChild(captionElement);

    itemsElement.appendChild(itemElement);
  });
}
// Load cart data from localStorage when the page is loaded
document.addEventListener('DOMContentLoaded', function () {
  // Try to retrieve the cart data from localStorage
  const storedCartData = localStorage.getItem('cartData');

  // If there is stored data, parse it and set it to cartData
  if (storedCartData) {
    cartData = JSON.parse(storedCartData);
    updateCart(); // Update the cart UI
  }
});
function updateLocalStorage() {
  localStorage.setItem('cartData', JSON.stringify(cartData));
}
function clearCart() {
  cartData = [];
  updateCart();
  updateLocalStorage();
}
