document.addEventListener("DOMContentLoaded", function () {
  const cartContainer = document.querySelector(".shopping-cart");

  // Klik tombol Add to Cart
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const card = this.closest(".card-menu");

      const name = card.dataset.name;
      const price = parseInt(card.dataset.price, 10);
      const img = card.dataset.img;

      // cek apakah item sudah ada di cart
      const existing = cartContainer.querySelector(
        `[data-cart-name="${name}"]`
      );
      if (existing) {
        // jika sudah ada, bisa menambah qty atau abaikan, contoh tambah qty:
        const qtyEl = existing.querySelector(".item-qty");
        qtyEl.textContent = parseInt(qtyEl.textContent) + 1;
        return;
      }

      // buat elemen item baru
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.dataset.cartName = name;
      cartItem.innerHTML = `
        <img src="${img}" alt="${name}">
        <div class="item-detail">
          <h3>${name}</h3>
          <div class="item-price">IDR ${price.toLocaleString()}</div>
          <div>Qty: <span class="item-qty">1</span></div>
        </div>
        <i data-feather="trash-2" class="remove-item"></i>
      `;

      cartContainer.appendChild(cartItem);
      feather.replace(); // refresh icon feather

      // tombol hapus
      cartItem
        .querySelector(".remove-item")
        .addEventListener("click", function () {
          cartItem.remove();
        });
    });
  });
});
