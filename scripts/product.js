// get product id
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];
document.getElementById("cartCount").textContent = cart.length;

let quantity = 1;
let basePrice = 0;

// fetch product
fetch(`https://fakestoreapi.com/products/${productId}`)
  .then(res => res.json())
  .then(product => {

    // set product data
    document.getElementById("productImage").src = product.image;
    document.getElementById("productTitle").textContent = product.title;
    document.getElementById("productDescription").textContent = product.description;

    basePrice = product.price;
    document.getElementById("totalPrice").textContent = basePrice;

    // quantity buttons
    document.getElementById("plus").onclick = () => {
      if (quantity < 10) quantity++;
      updatePrice();
    };

    document.getElementById("minus").onclick = () => {
      if (quantity > 1) quantity--;
      updatePrice();
    };

    function updatePrice() {
      document.getElementById("qty").textContent = quantity;
      document.getElementById("totalPrice").textContent =
        (basePrice * quantity).toFixed(2);
    }

    // add to cart
    document.getElementById("addToCart").onclick = () => {
      const item = {
        id: product.id,
        title: product.title,
        price: basePrice,
        qty: quantity,
        color: document.getElementById("colorSelect").value,
        size: document.getElementById("sizeSelect").value,
        image: product.image
      };

      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));
      document.getElementById("cartCount").textContent = cart.length;

      showToast("Added to cart ✅");
    };
  })
  .catch(err => console.error("Error:", err));

// toast message
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 2000);
}
