document.addEventListener("DOMContentLoaded", function () {
  const cartContainer = document.querySelector(".shopping-cart");
  const cartCountEl = document.getElementById("cart-count"); // badge merah
  const cartSummary = document.getElementById("cart-summary"); // box ringkasan
  const totalQtyEl = document.getElementById("total-qty");
  const totalPriceEl = document.getElementById("total-price");

  // Hitung qty & harga total
  function updateCartTotals() {
    let totalQty = 0;
    let totalPrice = 0;

    cartContainer.querySelectorAll(".cart-item").forEach((item) => {
      const qty = parseInt(item.querySelector(".item-qty").textContent, 10);
      const price = parseInt(item.dataset.price, 10); // simpan price di data
      totalQty += qty;
      totalPrice += price * qty;
    });

    // update badge merah
    if (totalQty > 0) {
      cartCountEl.style.display = "inline-block";
      cartCountEl.textContent = totalQty;
    } else {
      cartCountEl.style.display = "none";
    }

    // update ringkasan total
    if (totalQty > 0) {
      cartSummary.style.display = "block";
      totalQtyEl.textContent = totalQty;
      totalPriceEl.textContent = "IDR " + totalPrice.toLocaleString();
    } else {
      cartSummary.style.display = "none";
    }
  }

  // Event Add to Cart
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const card = this.closest(".card-menu");

      const name = card.dataset.name;
      const price = parseInt(card.dataset.price, 10);
      const img = card.dataset.img;

      const existing = cartContainer.querySelector(
        `[data-cart-name="${name}"]`
      );
      if (existing) {
        const qtyEl = existing.querySelector(".item-qty");
        qtyEl.textContent = parseInt(qtyEl.textContent) + 1;
        updateCartTotals();
        return;
      }

      // Buat elemen cart-item baru dengan data-price
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.dataset.cartName = name;
      cartItem.dataset.price = price; // penting untuk perhitungan total
      cartItem.innerHTML = `
        <img src="${img}" alt="${name}">
        <div class="item-detail">
          <h3>${name}</h3>
          <div class="item-price">IDR ${price.toLocaleString()}</div>
          <div>Qty: <span class="item-qty">1</span></div>
        </div>
        <i data-feather="trash-2" class="remove-item"></i>
      `;
      cartContainer.insertBefore(cartItem, cartSummary); // letakkan sebelum summary
      feather.replace();

      // Event hapus item
      cartItem
        .querySelector(".remove-item")
        .addEventListener("click", function () {
          cartItem.remove();
          updateCartTotals();
        });

      updateCartTotals();
    });
  });
});
