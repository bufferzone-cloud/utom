// Exchange rate for USD to ZAR (South African Rand)
const exchangeRate = 18.5;

const products = [
  {
    id: 1, 
    name: "AE 'Small pocket' Shirt", 
    price: 69.95, 
    originalPrice: 89.95,
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
      "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    ],
    description: "Classic shirt with small pocket detail. Made from 100% organic cotton for maximum comfort and breathability.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#2c2c2c", "#44c3ff", "#3cb46e"]
  },
  {
    id: 2, 
    name: "Aelfric Eden Vintage", 
    price: 104.95, 
    originalPrice: 129.95,
    images: [
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    ],
    description: "Vintage-inspired hoodie with unique graphic prints. Features a comfortable fit and premium fabric for all-day wear.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#ff3e30", "#2c2c2c", "#3cb46e"]
  },
  {
    id: 3, 
    name: "Orange Hoodie", 
    price: 64.95, 
    originalPrice: 79.95,
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
    ],
    description: "Vibrant orange hoodie made from soft, brushed fleece. Perfect for casual outings and comfortable loungewear.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["#ff3e30", "#2c2c2c", "#44c3ff"]
  },
  {
    id: 4, 
    name: "Denim Jacket", 
    price: 89.95, 
    originalPrice: 119.95,
    images: [
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80",
      "https://images.unsplash.com/photo-1604644401890-0bd678c83788?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    ],
    description: "Classic denim jacket with a modern fit. Features vintage wash and durable construction for long-lasting wear.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#44c3ff", "#2c2c2c"]
  }
];

let cart = [];
let wishlist = [];
let currentProduct = null;
let selectedPaymentMethod = 'cash';

// Convert USD to ZAR
function toRand(usd) {
  return (usd * exchangeRate).toFixed(2);
}

function renderProducts() {
  const list = document.getElementById('productList');
  list.innerHTML = products.map(p => `
    <div class="product" onclick="showDetail(${p.id})">
      <button class="wishlist-btn ${wishlist.some(item => item.id === p.id) ? 'active' : ''}" onclick="toggleWishlist(event, ${p.id})">
        <i class="${wishlist.some(item => item.id === p.id) ? 'fas' : 'far'} fa-heart"></i>
      </button>
      <img src="${p.images[0]}" alt="${p.name}" class="product-img">
      <div class="product-info">
        <h4>${p.name}</h4>
        <div class="product-price">
          <span class="current-price">R ${toRand(p.price)}</span>
          ${p.originalPrice > p.price ? `<span class="original-price">R ${toRand(p.originalPrice)}</span>` : ''}
          ${p.originalPrice > p.price ? `<span class="discount">-${Math.round((1 - p.price/p.originalPrice)*100)}%</span>` : ''}
        </div>
        <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${p.id})">
          <i class="fas fa-shopping-bag"></i> Add to Cart
        </button>
      </div>
    </div>
  `).join('');

  // Also render new arrivals (for demo, using same products)
  const newArrivalsList = document.getElementById('newArrivalsList');
  newArrivalsList.innerHTML = products.slice(0, 2).map(p => `
    <div class="product" onclick="showDetail(${p.id})">
      <button class="wishlist-btn ${wishlist.some(item => item.id === p.id) ? 'active' : ''}" onclick="toggleWishlist(event, ${p.id})">
        <i class="${wishlist.some(item => item.id === p.id) ? 'fas' : 'far'} fa-heart"></i>
      </button>
      <img src="${p.images[0]}" alt="${p.name}" class="product-img">
      <div class="product-info">
        <h4>${p.name}</h4>
        <div class="product-price">
          <span class="current-price">R ${toRand(p.price)}</span>
          ${p.originalPrice > p.price ? `<span class="original-price">R ${toRand(p.originalPrice)}</span>` : ''}
          ${p.originalPrice > p.price ? `<span class="discount">-${Math.round((1 - p.price/p.originalPrice)*100)}%</span>` : ''}
        </div>
        <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${p.id})">
          <i class="fas fa-shopping-bag"></i> Add to Cart
        </button>
      </div>
    </div>
  `).join('');
}

function renderWishlist() {
  const list = document.getElementById('wishlistItems');
  if (wishlist.length === 0) {
    list.innerHTML = `
      <div class="empty-cart">
        <div class="empty-icon"><i class="far fa-heart"></i></div>
        <div class="empty-text">Your wishlist is empty</div>
        <button class="btn" onclick="showPage('homePage')">Continue Shopping</button>
      </div>
    `;
    return;
  }
  
  list.innerHTML = wishlist.map(p => `
    <div class="product" onclick="showDetail(${p.id})">
      <button class="wishlist-btn active" onclick="toggleWishlist(event, ${p.id})">
        <i class="fas fa-heart"></i>
      </button>
      <img src="${p.images[0]}" alt="${p.name}" class="product-img">
      <div class="product-info">
        <h4>${p.name}</h4>
        <div class="product-price">
          <span class="current-price">R ${toRand(p.price)}</span>
          ${p.originalPrice > p.price ? `<span class="original-price">R ${toRand(p.originalPrice)}</span>` : ''}
        </div>
        <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${p.id})">
          <i class="fas fa-shopping-bag"></i> Add to Cart
        </button>
      </div>
    </div>
  `).join('');
}

function showDetail(id) {
  const p = products.find(x => x.id === id);
  currentProduct = p;
  const detail = document.getElementById('detailContent');
  detail.innerHTML = `
    <div class="product-gallery">
      <img src="${p.images[0]}" alt="${p.name}" class="main-image" id="mainImage">
      <div class="image-thumbnails">
        ${p.images.map((img, index) => `
          <img src="${img}" class="thumbnail ${index === 0 ? 'active' : ''}" onclick="changeImage('${img}', this)">
        `).join('')}
      </div>
    </div>
    <h2 class="product-title">${p.name}</h2>
    <div class="product-price">
      <span class="current-price">R ${toRand(p.price)}</span>
      ${p.originalPrice > p.price ? `<span class="original-price">R ${toRand(p.originalPrice)}</span>` : ''}
      ${p.originalPrice > p.price ? `<span class="discount">-${Math.round((1 - p.price/p.originalPrice)*100)}%</span>` : ''}
    </div>
    <p class="product-description">${p.description}</p>
    
    <div class="size-selector">
      <div class="selector-title">Size</div>
      <div class="sizes">
        ${p.sizes.map(size => `
          <div class="size" onclick="selectSize(this)">${size}</div>
        `).join('')}
      </div>
    </div>
    
    <div class="color-selector">
      <div class="selector-title">Color</div>
      <div class="colors">
        ${p.colors.map((color, index) => `
          <div class="color color-${index+1} ${index === 0 ? 'selected' : ''}" style="background-color: ${color}" onclick="selectColor(this)"></div>
        `).join('')}
      </div>
    </div>
    
    <div class="detail-actions">
      <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
      <button class="btn wishlist-detail-btn" onclick="toggleWishlist(null, ${p.id}); this.classList.toggle('active')">
        <i class="${wishlist.some(item => item.id === p.id) ? 'fas' : 'far'} fa-heart"></i>
      </button>
    </div>
  `;
  showPage('detailPage');
}

function changeImage(src, element) {
  document.getElementById('mainImage').src = src;
  document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
  element.classList.add('active');
}

function selectSize(element) {
  document.querySelectorAll('.size').forEach(size => size.classList.remove('selected'));
  element.classList.add('selected');
}

function selectColor(element) {
  document.querySelectorAll('.color').forEach(color => color.classList.remove('selected'));
  element.classList.add('selected');
}

function toggleWishlist(event, id) {
  if (event) event.stopPropagation();
  
  const index = wishlist.findIndex(item => item.id === id);
  if (index === -1) {
    const product = products.find(p => p.id === id);
    wishlist.push(product);
  } else {
    wishlist.splice(index, 1);
  }
  
  // Update UI
  renderProducts();
  if (document.getElementById('wishlistPage').classList.contains('active')) {
    renderWishlist();
  }
}

function addToCart(id) {
  const p = products.find(x => x.id === id);
  const size = document.querySelector('.size.selected') ? document.querySelector('.size.selected').textContent : 'M';
  const color = document.querySelector('.color.selected') ? document.querySelector('.color.selected').style.backgroundColor : '#2c2c2c';
  
  cart.push({
    ...p,
    cartId: Date.now(),
    selectedSize: size,
    selectedColor: color,
    quantity: 1
  });
  
  updateCartCount();
  showFloatingCart();
  
  // Show success message
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--success);
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `;
  notification.innerHTML = `<i class="fas fa-check"></i> ${p.name} added to cart!`;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function updateCartCount() {
  const count = cart.length;
  document.getElementById('cartCount').textContent = count;
  document.querySelector('.floating-count').textContent = count;
}

function showFloatingCart() {
  const floatingCart = document.getElementById('floatingCart');
  floatingCart.style.display = 'flex';
  
  // Add animation
  floatingCart.style.animation = 'bounce 0.5s ease';
  setTimeout(() => {
    floatingCart.style.animation = '';
  }, 500);
}

function showCart() {
  const container = document.getElementById('cartItems');
  
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <div class="empty-icon"><i class="fas fa-shopping-bag"></i></div>
        <div class="empty-text">Your cart is empty</div>
        <button class="btn" onclick="showPage('homePage')">Continue Shopping</button>
      </div>
    `;
    document.getElementById('cartSubtotal').textContent = "R 0.00";
    document.getElementById('cartTotal').textContent = "R 0.00";
    return;
  }
  
  let subtotal = 0;
  container.innerHTML = cart.map((item, index) => {
    subtotal += item.price * item.quantity;
    return `
      <div class="cart-item">
        <img src="${item.images[0]}" class="cart-item-img">
        <div class="cart-item-details">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-meta">Size: ${item.selectedSize} | Color: <div class="color" style="background-color: ${item.selectedColor}; display: inline-block; width: 12px; height: 12px; border-radius: 50%; vertical-align: middle; margin-left: 5px;"></div></div>
          <div class="cart-item-actions">
            <div class="quantity-control">
              <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
              <span class="quantity">${item.quantity}</span>
              <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
            </div>
            <span>R ${(toRand(item.price * item.quantity))}</span>
            <button class="remove-btn" onclick="removeFromCart(${index})"><i class="fas fa-trash"></i></button>
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  const shipping = 50.00;
  const total = parseFloat(toRand(subtotal)) + shipping;
  
  document.getElementById('cartSubtotal').textContent = "R " + toRand(subtotal);
  document.getElementById('cartTotal').textContent = "R " + total.toFixed(2);
}

function updateQuantity(index, change) {
  cart[index].quantity += change;
  
  if (cart[index].quantity < 1) {
    cart[index].quantity = 1;
  }
  
  showCart();
  updateCartCount();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartCount();
  showCart();
  
  if (cart.length === 0) {
    document.getElementById('floatingCart').style.display = 'none';
  }
}

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  
  if (pageId === "cartPage") { 
    showCart(); 
  } else if (pageId === "wishlistPage") {
    renderWishlist();
  } else if (pageId === "checkoutPage") {
    updateCheckoutSummary();
  }
}

function selectPayment(element, method) {
  document.querySelectorAll('.payment-method').forEach(method => method.classList.remove('selected'));
  element.classList.add('selected');
  selectedPaymentMethod = method;
  updateCheckoutSummary();
}

function updateCheckoutSummary() {
  let subtotal = 0;
  cart.forEach(item => {
    subtotal += item.price * item.quantity;
  });
  
  const shipping = 50.00;
  let total = parseFloat(toRand(subtotal)) + shipping;
  
  if (selectedPaymentMethod === 'nextMonth') {
    total = total * 1.15; // 15% increase
  }
  
  const summary = document.getElementById('checkoutSummary');
  summary.innerHTML = `
    <div class="summary-row">
      <span>Subtotal</span>
      <span>R ${toRand(subtotal)}</span>
    </div>
    <div class="summary-row">
      <span>Shipping</span>
      <span>R ${shipping.toFixed(2)}</span>
    </div>
    ${selectedPaymentMethod === 'nextMonth' ? `
      <div class="summary-row">
        <span>Payment Fee (15%)</span>
        <span>R ${(total * 0.15 / 1.15).toFixed(2)}</span>
      </div>
    ` : ''}
    <div class="summary-row summary-total">
      <span>Total</span>
      <span>R ${total.toFixed(2)}</span>
    </div>
  `;
}

function placeOrder() {
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
  });
  
  total = parseFloat(toRand(total)) + 50.00;
  
  if (selectedPaymentMethod === 'nextMonth') {
    total = total * 1.15;
  }
  
  alert(`Order placed successfully!\nTotal: R ${total.toFixed(2)}\nPayment Method: ${selectedPaymentMethod === 'cash' ? 'Pay Cash' : 'Pay Next Month'}\n\nThank you for shopping with Costace Chisale Online Store!`);
  
  cart = [];
  updateCartCount();
  showCart();
  showPage('homePage');
  document.getElementById('floatingCart').style.display = 'none';
}

function scrollToProducts() {
  document.querySelector('.section-title').scrollIntoView({ 
    behavior: 'smooth' 
  });
}

// Initialize floating cart
document.getElementById('floatingCart').addEventListener('click', () => {
  showPage('cartPage');
});

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes bounce {
    0%, 20%, 60%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    80% { transform: translateY(-5px); }
  }
`;
document.head.appendChild(style);

// Initialize
renderProducts();
updateCartCount();