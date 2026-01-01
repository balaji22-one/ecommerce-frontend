 console.log("JS working");
// cart count
let cartCount = 0;
const cartCountEl = document.getElementById("cartCount");

const productGrid = document.getElementById("productGrid");

// fetch products
fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(products => {
    products.forEach(product => {
      const card = document.createElement("a");
      card.className = "product-card";
      card.href = `product.html?id=${product.id}`;
      card.innerHTML = `
        <img src="${product.image}" loading="lazy">
        <h3>${product.title}</h3>
        <p class="price">₹ ${product.price}</p>
        <button>Add to Cart</button>
      `;

      card.querySelector("button").addEventListener("click", () => {
        cartCount++;
        cartCountEl.textContent = cartCount;
      });

      productGrid.appendChild(card);
    });
  })
  .catch(err => console.error(err));