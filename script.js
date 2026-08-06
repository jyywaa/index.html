// DATA
const avatars = {
  Syera: "https://i.imgur.com/8Km9tLL.png",
  Niel: "https://i.imgur.com/4AiXzf8.png",
  Karel: "https://i.imgur.com/3GvwNBf.png",
  Ata: "https://i.imgur.com/JqYE2yQ.png",
  Carmen: "https://i.imgur.com/1bX5QH6.png",
  Karina: "https://i.imgur.com/Li0i2kW.png",
  Rindi: "https://i.imgur.com/8deAn0F.png"
};

const products = [
  { id: 1, nama: "Ayam Geprek", harga: 18000, old: 22000, diskon: "18% OFF", rating: 4.8, img: "https://images.unsplash.com/photo-1606756790138-261d2b800f0b?w=400", kat: "food", sub: "berat", desc: "Ayam geprek renyah dengan sambal korek pedas nikmat, disajikan segar." },
  { id: 2, nama: "Nasi Goreng", harga: 20000, old: 24000, diskon: "15% OFF", rating: 4.7, img: "https://images.unsplash.com/photo-1604908177453-7462950a6a3b?w=400", kat: "food", sub: "berat", desc: "Nasi goreng spesial dengan bumbu rempah pilihan dan telur ceplok." },
  { id: 5, nama: "Matcha Latte", harga: 22000, diskon: "Promo", rating: 4.8, img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400", kat: "food", sub: "minuman", desc: "Minuman matcha autentik dipadukan dengan susu segar yang creamy." },
  { id: 7, nama: "Es Krim Mochi", harga: 15000, old: 18000, diskon: "B1G1", rating: 4.9, img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400", kat: "food", sub: "dessert", desc: "Kue mochi kenyal berisi es krim lembut rasa manis menyegarkan." },
  { id: 9, nama: "Cardigan Pink", harga: 120000, old: 150000, diskon: "20% OFF", rating: 4.8, img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400", kat: "outfit", sub: "cardigan", desc: "Cardigan berbahan rajut premium yang nyaman dan stylish untuk dipakai harian." },
  { id: 10, nama: "Sweater Oversize", harga: 135000, diskon: "Terlaris", rating: 4.7, img: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=400", kat: "outfit", sub: "sweater", desc: "Sweater oversize kekinian, hangat dan pas untuk tampilan casual." },
  { id: 14, nama: "Jeans Biru", harga: 160000, old: 200000, diskon: "20% OFF", rating: 4.8, img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400", kat: "outfit", sub: "jeans", desc: "Celana jeans warna biru klasik dengan potongan ergonomis dan nyaman." }
];

let cart = JSON.parse(localStorage.getItem('mochiCart') || '[]');
let barang = JSON.parse(localStorage.getItem('barang') || '[]');
let pesanan = JSON.parse(localStorage.getItem('pesanan') || '[{"id":1,"pembeli":"Syera","total":36000,"status":"dikemas","tgl":"2026-08-06"}]');
const komentar = [
  { nama: "Karina", text: "Enak banget, packing rapi!" },
  { nama: "Rindi", text: "Ukuran pas, bahan adem" }
];

// LOGIN UDAH GANTI JADI MEILA
function login() {
  let u = document.getElementById('username').value;
  let p = document.getElementById('password').value;
  if (u == 'meila' && p == 'meila123') {
    showPage('adminPage');
    refreshAdmin();
  } else if (u == 'customer' && p == '123') {
    showPage('customerPage');
    init();
  } else {
    alert('Username/Password salah');
  }
}

function logout() {
  showPage('loginPage');
}

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ADMIN
function showAdmin(id, el) {
  document.querySelectorAll('.main > div').forEach(t => t.style.display = 'none');
  document.getElementById(id).style.display = 'block';
  document.querySelectorAll('.sidebar div').forEach(d => d.classList.remove('active'));
  el.classList.add('active');
}

function refreshAdmin() {
  document.getElementById('totalBarang').innerText = barang.length;
  document.getElementById('totalStok').innerText = barang.reduce((a, b) => a + (b.stok || 0), 0);
  document.getElementById('totalPesanan').innerText = pesanan.length;
  document.getElementById('tabelBarang').innerHTML = barang.map(b => `<tr><td>${b.nama}</td><td>Rp${b.harga.toLocaleString()}</td><td>${b.stok}</td><td><button onclick="hapus(${b.id})">Hapus</button></td></tr>`).join('');
  document.getElementById('tabelPesanan').innerHTML = pesanan.map(p => `<tr><td>#MCH00${p.id}</td><td>${p.pembeli}</td><td>Rp${p.total.toLocaleString()}</td><td><span class="status ${p.status}">${p.status}</span></td><td><select onchange="ubahStatus(${p.id},this.value)"><option>Dikemas</option><option>Dikirim</option><option>Selesai</option></select></td></tr>`).join('');
}

function tambahBarang() {
  barang.push({
    id: Date.now(),
    nama: document.getElementById('namaBarang').value,
    harga: +document.getElementById('hargaBarang').value,
    stok: +document.getElementById('stokBarang').value
  });
  localStorage.setItem('barang', JSON.stringify(barang));
  alert('Barang tersimpan');
  refreshAdmin();
}

function hapus(id) {
  barang = barang.filter(b => b.id != id);
  localStorage.setItem('barang', JSON.stringify(barang));
  refreshAdmin();
}

function ubahStatus(id, val) {
  pesanan.find(x => x.id == id).status = val.toLowerCase();
  localStorage.setItem('pesanan', JSON.stringify(pesanan));
  refreshAdmin();
}

function buatLaporan() {
  let jenis = document.getElementById('jenisLaporan').value;
  let awal = new Date(document.getElementById('tglAwal').value);
  let akhir = new Date(document.getElementById('tglAkhir').value);
  let data = pesanan.filter(p => {
    let t = new Date(p.tgl);
    if (jenis == 'harian') return t >= awal && t <= akhir;
    if (jenis == 'bulanan') return t.getMonth() == awal.getMonth() && t.getFullYear() == awal.getFullYear();
    if (jenis == 'tahunan') return t.getFullYear() == awal.getFullYear();
  });
  document.getElementById('tabelLaporan').innerHTML = data.map(p => `<tr><td>${p.tgl}</td><td>#MCH00${p.id}</td><td>Rp${p.total.toLocaleString()}</td></tr>`).join('') || '<tr><td colspan=3>Data kosong</td></tr>';
}

// CUSTOMER
function render(list, target) {
  document.getElementById(target).innerHTML = list.map(p => `
    <div class="card-cus" onclick="showDetail(${p.id})">
      <span class="badge">${p.diskon}</span>
      <img src="${p.img}">
      <div class="info">
        <div style="font-weight:700">${p.nama}</div>
        <div>
          <span class="price">Rp${p.harga.toLocaleString()}</span>
          <span class="old">${p.old ? 'Rp' + p.old.toLocaleString() : ''}</span>
        </div>
        <div>★ ${p.rating}</div>
      </div>
    </div>
  `).join('');
}

function init() {
  render(products, 'homeGrid');
  render(products.filter(p => p.kat == 'food'), 'foodGrid');
  render(products.filter(p => p.kat == 'outfit'), 'outfitGrid');
  render(products.filter(p => p.old), 'promoGrid');
  renderCart();
}

function showDetail(id) {
  const p = products.find(x => x.id == id);
  document.getElementById('detailContent').innerHTML = `
    <img src="${p.img}" style="width:100%;border-radius:18px">
    <h2 style="margin-top:10px">${p.nama}</h2>
    <div class="price" style="font-size:20px">Rp${p.harga.toLocaleString()}</div>
    
    <div class="detail-actions">
      <button class="btn-icon-cart" onclick="addCart(${p.id})">🛒 Keranjang</button>
      <button class="btn-buy" onclick="buyNow(${p.id})">Beli Sekarang</button>
    </div>

    <div class="prod-desc">
      <b>Deskripsi Produk:</b><br>
      ${p.desc || 'Produk berkualitas tinggi dari MochiShop.'}
    </div>

    <h4 style="margin-top:16px">Komentar Pembeli</h4>
    ${komentar.map(k => `
      <div class="comment">
        <img src="${avatars[k.nama] || 'https://i.imgur.com/8Km9tLL.png'}" class="avatar-sm">
        <b>${k.nama}:</b> ${k.text}
      </div>
    `).join('')}
  `;
  setCusTab('detail');
}

function addCart(id) {
  cart.push(products.find(x => x.id == id));
  localStorage.setItem('mochiCart', JSON.stringify(cart));
  renderCart();
}

function buyNow(id) {
  addCart(id);
  navCus('cart');
}

function renderCart() {
  if (cart.length == 0) {
    document.getElementById('cartList').innerHTML = "<p style='text-align:center'>Keranjang kosong</p>";
    document.getElementById('total').innerText = "";
    return;
  }
  document.getElementById('cartList').innerHTML = cart.map((c, i) => `
    <div class="cart-item">
      <img src="${c.img}" style="width:70px;height:70px;border-radius:12px">
      <div>
        <div style="font-weight:700">${c.nama}</div>
        <div class="price">Rp${c.harga.toLocaleString()}</div>
        <button onclick="hapusCart(${i})" style="color:red;border:none;background:none;cursor:pointer">Hapus</button>
      </div>
    </div>
  `).join('');
  document.getElementById('total').innerText = "Total: Rp" + cart.reduce((a, b) => a + b.harga, 0).toLocaleString();
}

function hapusCart(i) {
  cart.splice(i, 1);
  localStorage.setItem('mochiCart', JSON.stringify(cart));
  renderCart();
}

function checkout() {
  if (cart.length == 0) return alert('Keranjang kosong');
  pesanan.push({
    id: Date.now(),
    pembeli: "Syera",
    total: cart.reduce((a, b) => a + b.harga, 0),
    status: "dikemas",
    tgl: new Date().toISOString().split('T')[0]
  });
  localStorage.setItem('pesanan', JSON.stringify(pesanan));
  alert('Checkout berhasil!');
  cart = [];
  localStorage.setItem('mochiCart', '[]');
  renderCart();
  navCus('home');
}

function search() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  render(products.filter(p => p.nama.toLowerCase().includes(q)), 'homeGrid');
}

function searchFood() {
  const q = document.getElementById('searchFood').value.toLowerCase();
  render(products.filter(p => p.kat == 'food' && p.nama.toLowerCase().includes(q)), 'foodGrid');
}

function searchOutfit() {
  const q = document.getElementById('searchOutfit').value.toLowerCase();
  render(products.filter(p => p.kat == 'outfit' && p.nama.toLowerCase().includes(q)), 'outfitGrid');
}

function filterFood(sub) {
  render(sub == 'semua' ? products.filter(p => p.kat == 'food') : products.filter(p => p.kat == 'food' && p.sub == sub), 'foodGrid');
}

function filterOutfit(sub) {
  render(products.filter(p => p.kat == 'outfit' && p.sub == sub), 'outfitGrid');
}

function setCusTab(id, el) {
  document.querySelectorAll('.cus-tab').forEach(p => p.style.display = 'none');
  document.getElementById(id).style.display = 'block';
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  if (el) el.classList.add('active');
}

function navCus(p) {
  setCusTab(p);
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (window.event && window.event.target) {
    window.event.target.classList.add('active');
  }
}

function back() {
  setCusTab('home');
}
