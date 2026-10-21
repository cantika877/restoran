// Data Menu Restoran (Masalah 2)
const menuList = [
    { id: 1, name: "Nasi Goreng Spesial", price: 25000, desc: "Nasi goreng dengan telor, ayam, dan sate" },
    { id: 2, name: "Mie Ayam Bakso", price: 20000, desc: "Mie kenyal dengan topping ayam dan bakso sapi" },
    { id: 3, name: "Es Teh Manis", price: 5000, desc: "Teh melati segar dengan es batu" }
];

let cart = [];

// Tampilkan menu ke HTML saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
    const menuContainer = document.getElementById("menu-container");
    menuList.forEach(item => {
        const card = document.createElement("div");
        card.className = "menu-card";
        card.innerHTML = `
            <div class="menu-info">
                <h4>${item.name}</h4>
                <p>${item.desc}</p>
                <span class="price">Rp ${item.price.toLocaleString()}</span>
            </div>
            <div class="menu-action">
                <input type="text" id="note-${item.id}" placeholder="Catatan: misal tak pedas">
                <button class="add-btn" onclick="addToCart(${item.id})">+ Tambah</button>
            </div>
        `;
        menuContainer.appendChild(card);
    });
});

// Tambah ke Keranjang Beserta Catatan (Masalah 3)
function addToCart(id) {
    const item = menuList.find(m => m.id === id);
    const note = document.getElementById(`note-${id}`).value || "Tanpa catatan";
    
    cart.push({ ...item, note });
    updateCartUI();
}

// Perbarui Tampilan Keranjang
function updateCartUI() {
    const cartContainer = document.getElementById("cart-items");
    const totalPriceEl = document.getElementById("total-price");
    const checkoutBtn = document.getElementById("checkout-btn");

    if (cart.length === 0) {
        cartContainer.innerHTML = `<p class="empty-cart">Belum ada menu yang dipilih.</p>`;
        totalPriceEl.innerText = "Rp 0";
        checkoutBtn.disabled = true;
        return;
    }

    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach((cartItem, index) => {
        total += cartItem.price;
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <div>
                <strong>${cartItem.name}</strong><br>
                <small style="color:#666;">Catatan: ${cartItem.note}</small>
            </div>
            <div>
                <span>Rp ${cartItem.price.toLocaleString()}</span>
                <button onclick="removeFromCart(${index})" style="background:none;border:none;color:red;cursor:pointer;margin-left:5px;">×</button>
            </div>
        `;
        cartContainer.appendChild(div);
    });

    totalPriceEl.innerText = `Rp ${total.toLocaleString()}`;
    checkoutBtn.disabled = false;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Logika Panggil Pelayan (Masalah 1)
function openWaiterModal() { document.getElementById("waiter-modal").classList.remove("hidden"); }
function closeWaiterModal() { document.getElementById("waiter-modal").classList.add("hidden"); }
function callWaiter(action) {
    alert(`Permintaan "${action}" untuk Meja 05 telah dikirim ke pelayan.`);
    closeWaiterModal();
}

// Logika Pembayaran & Struk Digital / E-Receipt (Masalah 4)
function openCheckoutModal() {
    document.getElementById("checkout-form-view").classList.remove("hidden");
    document.getElementById("receipt-view").classList.add("hidden");
    document.getElementById("checkout-modal").classList.remove("hidden");
}
function closeCheckoutModal() { document.getElementById("checkout-modal").classList.add("hidden"); }

function processPayment() {
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    const tableNumber = document.getElementById("table-number").innerText;
    
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    let itemsHtml = cart.map(i => `<li>${i.name} (${i.note}) - Rp ${i.price.toLocaleString()}</li>`).join("");

    // Buat Struk Digital (E-Receipt)
    document.getElementById("receipt-details-content").innerHTML = `
        <p><b>Meja:</b> ${tableNumber}</p>
        <p><b>Metode:</b> ${paymentMethod}</p>
        <p><b>Daftar Pesanan:</b></p>
        <ul>${itemsHtml}</ul>
        <hr>
        <p><b>Total Bayar: Rp ${total.toLocaleString()}</b></p>
    `;

    // Ubah tampilan modal ke struk digital
    document.getElementById("checkout-form-view").classList.add("hidden");
    document.getElementById("receipt-view").classList.remove("hidden");
}

function resetApp() {
    cart = [];
    updateCartUI();
    closeCheckoutModal();
}
