// DATA PRODUK DENGAN GAMBAR PRESISI SESUAI BARANG
const avatars = {
  Syera:"https://i.imgur.com/8Km9tLL.png", 
  Karina:"https://i.imgur.com/Li0i2kW.png", 
  Rindi:"https://i.imgur.com/8deAn0F.png"
};

const products = [
  {id:1, nama:"Ayam Geprek", harga:18000, old:22000, diskon:"18% OFF", rating:4.8, img:"https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&auto=format&fit=crop&q=80", kat:"food", sub:"berat", desc:"Ayam geprek crispy renyah dengan sambal bawang pedas gurih mantap! Level 1-5.", stok:35},
  {id:2, nama:"Nasi Goreng", harga:20000, old:24000, diskon:"15% OFF", rating:4.7, img:"https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&auto=format&fit=crop&q=80", kat:"food", sub:"berat", desc:"Nasi goreng spesial MochiShop. Bumbu meresap wangi, porsi jumbo + telur ceplok.", stok:20},
  {id:5, nama:"Matcha Latte", harga:22000, old:25000, diskon:"Promo", rating:4.8, img:"https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&auto=format&fit=crop&q=80", kat:"food", sub:"minuman", desc:"Matcha latte creamy rasa otentik khas Jepang. Dingin, seger dan manisnya pas.", stok:50},
  {id:7, nama:"Es Krim Mochi", harga:15000, old:18000, diskon:"B1G1", rating:4.9, img:"https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&auto=format&fit=crop&q=80", kat:"food", sub:"dessert", desc:"Es krim mochi kenyal lembut lumer di mulut. Varian cokelat manis & vanilla segar.", stok:40},
  {id:9, nama:"Cardigan Pink", harga:120000, old:150000, diskon:"20% OFF", rating:4.8, img:"https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&auto=format&fit=crop&q=80", kat:"outfit", sub:"cardigan", desc:"Cardigan rajut warna soft pink manis. Oversized style, halus adem dan tebal.", stok:15},
  {id:10, nama:"Sweater Oversize", harga:135000, old:160000, diskon:"Terlaris", rating:4.7, img:"https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&auto=format&fit=crop&q=80", kat:"outfit", sub:"sweater", desc:"Sweater oversize bahan fleece tebal hangat. Cocok dipakai nongkrong dan santai.", stok:18},
  {id:14, nama:"Jeans Biru", harga:160000, old:200000, diskon:"20% OFF", rating:4.8, img:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&auto=format&fit=crop&q=80", kat:"outfit", sub:"jeans", desc:"Celana jeans biru denim tebal premium. Jahitan rapi, fleksibel dan tidak kaku.", stok:25}
];

let cart = JSON.parse(localStorage.getItem('mochiCart')) || [];
let listBarang = JSON.parse(localStorage.getItem('mochi_barang')) || products;
let listSupplier = JSON.parse(localStorage.getItem('mochi_supplier')) || [
  { id: 'SUP-01', nama: 'PT Mochi Suksess', telp: '08123456789', alamat: 'Bandung' }
];
let listPembelian = JSON.parse(localStorage.getItem('mochi_pembelian')) || [];
let listPesanan = JSON.parse(localStorage.getItem('mochi_pesanan')) || [
  { id: 1, pembeli: "Syera", total: 36000, status: "dikemas", tgl: "2026-08-06" }
];
const komentar = [
  {nama:"Karina", text:"Enak banget mochi & kreasinya, packing super rapi!"},
  {nama:"Rindi", text:"Bahan cardigan adem pol, respon penjual cepat"}
];

// UTILITY TOAST
function toast(msg) {
  const t = document.getElementById('toast');
  if(!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1600);
}

// SISTEM LOGIN & UTAMA
function login() {
  let u = document.getElementById('username').value;
  let p = document.getElementById('password').value;
  if(u === 'meila' && p === 'meila123') {
    showPage('adminPage');
    refreshAdminData();
  } else if(u === 'customer' && p === '123') {
    showPage('customerPage');
    initCustomerStore();
  } else {
    toast('Username/Password salah!');
  }
}

function logout() {
  showPage('loginPage');
}

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ================= ADMIN FUNCTIONS =================
function showAdmin(id, el) {
  document.querySelectorAll('.admin-sec').forEach(s => s.style.display = 'none');
  document.getElementById(id).style.display = 'block';
  document.querySelectorAll('.sidebar div').forEach(d => d.classList.remove('active'));
  if(el) el.classList.add('active');
}

function refreshAdminData() {
  // Stats Ringkasan
  document.getElementById('totalBarang').innerText = listBarang.length;
  document.getElementById('totalStok').innerText = listBarang.reduce((a,b) => a + Number(b.stok||0), 0);
  document.getElementById('totalSupplier').innerText = listSupplier.length;
  document.getElementById('totalPesanan').innerText = listPesanan.length;

  // Tabel Barang
  document.getElementById('tabelBarang').innerHTML = listBarang.map(b => `
    <tr>
      <td>${b.id}</td>
      <td><b>${b.nama}</b></td>
      <td>${b.kat || b.kategori || 'food'}</td>
      <td>${b.stok} Pcs</td>
      <td><button class="btn btn-sm btn-danger" onclick="hapusBarang(${b.id})">Hapus</button></td>
    </tr>
  `).join('');

  // Tabel View & Edit Harga
  document.getElementById('tabelHarga').innerHTML = listBarang.map(b => `
    <tr>
      <td>${b.id}</td>
      <td>${b.nama}</td>
      <td>Rp ${(b.hargaBeli || b.harga*0.8).toLocaleString()}</td>
      <td><b style="color:var(--pink)">Rp ${Number(b.harga).toLocaleString()}</b></td>
      <td><button class="btn btn-sm btn-warning" onclick="editHargaBarang(${b.id})">Edit Harga</button></td>
    </tr>
  `).join('');

  // Tabel Supplier
  document.getElementById('tabelSupplier').innerHTML = listSupplier.map(s => `
    <tr>
      <td>${s.id}</td>
      <td><b>${s.nama}</b></td>
      <td>${s.telp}</td>
      <td>${s.alamat}</td>
      <td><button class="btn btn-sm btn-danger" onclick="hapusSupplier('${s.id}')">Hapus</button></td>
    </tr>
  `).join('');

  // Dropdown Pembelian Options
  document.getElementById('selectBarangPembelian').innerHTML = listBarang.map(b => `<option value="${b.nama}">${b.nama}</option>`).join('');
  document.getElementById('selectSupplierPembelian').innerHTML = listSupplier.map(s => `<option value="${s.nama}">${s.nama}</option>`).join('');

  // Tabel Pembelian
  document.getElementById('tabelPembelian').innerHTML = listPembelian.map(p => `
    <tr>
      <td>${p.nota}</td>
      <td>${p.tgl}</td>
      <td>${p.barang}</td>
      <td>${p.supplier}</td>
      <td><b style="color:green">+${p.qty}</b></td>
      <td>Rp ${Number(p.total).toLocaleString()}</td>
    </tr>
  `).join('');

  // Tabel Pesanan
  document.getElementById('tabelPesanan').innerHTML = listPesanan.map(p => `
    <tr>
      <td>#MCH00${p.id}</td>
      <td>${p.pembeli}</td>
      <td>Rp ${Number(p.total).toLocaleString()}</td>
      <td><span class="status ${p.status}">${p.status}</span></td>
      <td>
        <select onchange="ubahStatusPesanan(${p.id}, this.value)">
          <option value="dikemas" ${p.status==='dikemas'?'selected':''}>Dikemas</option>
          <option value="dikirim" ${p.status==='dikirim'?'selected':''}>Dikirim</option>
          <option value="selesai" ${p.status==='selesai'?'selected':''}>Selesai</option>
        </select>
      </td>
    </tr>
  `).join('');
}

function tambahBarang() {
  let nama = document.getElementById('namaBarang').value;
  let hargaJual = +document.getElementById('hargaJualBarang').value;
  let hargaBeli = +document.getElementById('hargaBeliBarang').value;
  let stok = +document.getElementById('stokBarang').value;
  let kat = document.getElementById('kategoriBarang').value;

  if(!nama || !hargaJual) return toast('Lengkapi nama dan harga!');

  listBarang.push({
    id: Date.now(), nama, harga: hargaJual, hargaBeli: hargaBeli || hargaJual*0.8, stok: stok || 10, kat,
    img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400", desc: "Produk berkualitas MochiShop"
  });

  localStorage.setItem('mochi_barang', JSON.stringify(listBarang));
  toast('Barang tersimpan!');
  refreshAdminData();
}

function editHargaBarang(id) {
  let h = prompt("Masukkan Harga Jual Baru (Rp):");
  if(h) {
    let b = listBarang.find(x => x.id == id);
    if(b) b.harga = Number(h);
    localStorage.setItem('mochi_barang', JSON.stringify(listBarang));
    toast('Harga berhasil diperbarui!');
    refreshAdminData();
  }
}

function hapusBarang(id) {
  listBarang = listBarang.filter(b => b.id != id);
  localStorage.setItem('mochi_barang', JSON.stringify(listBarang));
  toast('Barang dihapus!');
  refreshAdminData();
}

function tambahSupplier() {
  let nama = document.getElementById('namaSupplier').value;
  let telp = document.getElementById('telpSupplier').value;
  let alamat = document.getElementById('alamatSupplier').value;

  if(!nama) return toast('Isi nama supplier!');
  listSupplier.push({ id: 'SUP-0' + (listSupplier.length + 1), nama, telp, alamat });
  localStorage.setItem('mochi_supplier', JSON.stringify(listSupplier));
  toast('Supplier tersimpan!');
  refreshAdminData();
}

function hapusSupplier(id) {
  listSupplier = listSupplier.filter(s => s.id !== id);
  localStorage.setItem('mochi_supplier', JSON.stringify(listSupplier));
  toast('Supplier dihapus!');
  refreshAdminData();
}

function simpanPembelian() {
  let barang = document.getElementById('selectBarangPembelian').value;
  let supplier = document.getElementById('selectSupplierPembelian').value;
  let qty = +document.getElementById('qtyPembelian').value;
  let total = +document.getElementById('totalBeliPembelian').value;

  if(!qty) return toast('Isi jumlah stok!');

  let b = listBarang.find(x => x.nama === barang);
  if(b) b.stok = (b.stok || 0) + qty;

  listPembelian.push({
    nota: 'INV-' + Date.now().toString().slice(-5),
    tgl: new Date().toISOString().split('T')[0],
    barang, supplier, qty, total
  });

  localStorage.setItem('mochi_barang', JSON.stringify(listBarang));
  localStorage.setItem('mochi_pembelian', JSON.stringify(listPembelian));
  toast('Pembelian berhasil & Stok bertambah!');
  refreshAdminData();
}

function ubahStatusPesanan(id, val) {
  let p = listPesanan.find(x => x.id == id);
  if(p) p.status = val;
  localStorage.setItem('mochi_pesanan', JSON.stringify(listPesanan));
  toast('Status pesanan diubah!');
  refreshAdminData();
}

function buatLaporan() {
  let jenis = document.getElementById('jenisLaporan').value;
  let awal = new Date(document.getElementById('tglAwal').value);
  let akhir = new Date(document.getElementById('tglAkhir').value);

  let data = listPesanan.filter(p => {
    let t = new Date(p.tgl || Date.now());
    if(jenis === 'harian') return t >= awal && t <= akhir;
    return true;
  });

  document.getElementById('tabelLaporan').innerHTML = data.map(p => `
    <tr><td>${p.tgl || '2026-08-19'}</td><td>#MCH00${p.id}</td><td>Rp ${Number(p.total).toLocaleString()}</td></tr>
  `).join('') || '<tr><td colspan=3>Data tidak ditemukan</td></tr>';
}

// ================= CUSTOMER STORE FUNCTIONS =================
function initCustomerStore() {
  renderGrid(listBarang, 'homeGrid');
  renderGrid(listBarang.filter(p => p.kat === 'food'), 'foodGrid');
  renderGrid(listBarang.filter(p => p.kat === 'outfit'), 'outfitGrid');
  renderGrid(listBarang.filter(p => p.old), 'promoGrid');
  renderCart();
  updateCartCount();
}

function renderGrid(list, targetId) {
  const container = document.getElementById(targetId);
  if(!container) return;
  
  container.innerHTML = list.map(p => `
    <div class="card-cus" onclick="showDetailProduct(${p.id})">
      ${p.diskon ? `<span class="badge">${p.diskon}</span>` : ''}
      <img src="${p.img}">
      <div class="info">
        <div style="font-weight:700; font-size:13px;">${p.nama}</div>
        <div style="margin-top:2px;">
          <span class="price">Rp ${(p.harga).toLocaleString()}</span>
          ${p.old ? `<span class="old">Rp ${p.old.toLocaleString()}</span>` : ''}
        </div>
        <div style="font-size:11px; color:#666; margin-top:2px;">★ ${p.rating || 4.8} | Stok: ${p.stok||10}</div>
        <button class="card-btn" onclick="event.stopPropagation(); addCart(${p.id})">🛒 Beli</button>
      </div>
    </div>
  `).join('');
}

function showDetailProduct(id) {
  const p = listBarang.find(x => x.id == id);
  if(!p) return;
  
  document.getElementById('detailContent').innerHTML = `
    <img src="${p.img}" style="width:100%; height:220px; object-fit:cover; border-radius:18px;">
    <h2 style="margin-top:10px;">${p.nama}</h2>
    <p style="color:#555; margin:8px 0; font-size:13px;">${p.desc || 'Produk kualitas tinggi pilihan MochiShop'}</p>
    <div class="price" style="font-size:20px;">Rp ${p.harga.toLocaleString()}</div>
    <button class="btn" style="margin-top:10px;" onclick="addCart(${p.id})">🛒 Beli Sekarang</button>
    <h4 style="margin-top:20px;">Komentar Pembeli</h4>
    ${komentar.map(k => `
      <div class="comment">
        <img src="${avatars[k.nama] || avatars.Syera}" class="avatar-sm">
        <div><b>${k.nama}:</b> ${k.text}</div>
      </div>
    `).join('')}
  `;
  showCusSubTab('detail');
}

function addCart(id) {
  let item = listBarang.find(x => x.id == id);
  if(item) {
    cart.push(item);
    localStorage.setItem('mochiCart', JSON.stringify(cart));
    updateCartCount();
    toast('Masuk keranjang 🛒');
  }
}

function renderCart() {
  const cartList = document.getElementById('cartList');
  const totalEl = document.getElementById('total');

  if (cart.length === 0) {
    cartList.innerHTML = "<p style='text-align:center; color:#888; padding:20px;'>Keranjang masih kosong</p>";
    totalEl.innerText = "";
    return;
  }

  cartList.innerHTML = cart.map((c, i) => `
    <div class="cart-item">
      <img src="${c.img}" style="width:65px; height:65px; border-radius:12px; object-fit:cover;">
      <div style="flex:1;">
        <div style="font-weight:700; font-size:13px;">${c.nama}</div>
        <div class="price">Rp ${c.harga.toLocaleString()}</div>
        <button onclick="hapusCart(${i})" style="color:red; border:none; background:none; font-size:12px; margin-top:4px; cursor:pointer;">Hapus</button>
      </div>
    </div>
  `).join('');

  let grandTotal = cart.reduce((a, b) => a + b.harga, 0);
  totalEl.innerText = "Total: Rp " + grandTotal.toLocaleString();
}

function hapusCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('mochiCart', JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

function checkout() {
  if (cart.length === 0) return toast('Keranjang kosong!');
  
  let totalBeli = cart.reduce((a, b) => a + b.harga, 0);
  listPesanan.push({
    id: Date.now(),
    pembeli: "Syera",
    total: totalBeli,
    status: "dikemas",
    tgl: new Date().toISOString().split('T')[0]
  });

  localStorage.setItem('mochi_pesanan', JSON.stringify(listPesanan));
  toast('Checkout berhasil!');
  cart = [];
  localStorage.setItem('mochiCart', '[]');
  renderCart();
  updateCartCount();
  navCus('home');
}

function updateCartCount() {
  document.getElementById('cartCount').innerText = cart.length;
}

// NAVIGATION CUS SWITCHER
function showCusSubTab(tabId) {
  document.querySelectorAll('.cus-tab').forEach(t => t.style.display = 'none');
  const target = document.getElementById(tabId);
  if(target) target.style.display = 'block';
}

function navCus(pageId) {
  showCusSubTab(pageId);
  
  // Highlight Navigasi Bawah
  document.querySelectorAll('.bottom-nav .nav-item').forEach(n => n.classList.remove('active'));
  if(pageId === 'home') document.getElementById('nav-home').classList.add('active');
  if(pageId === 'cart') {
    document.getElementById('nav-cart').classList.add('active');
    renderCart();
  }
  if(pageId === 'account') document.getElementById('nav-account').classList.add('active');
}

function switchMainCategory(tabId, el) {
  showCusSubTab(tabId);
  document.querySelectorAll('.tabs .tab').forEach(t => t.classList.remove('active'));
  if(el) el.classList.add('active');
}

function backToHome() {
  navCus('home');
}

// SEARCH & FILTERS
function searchHome() {
  let q = document.getElementById('searchInput').value.toLowerCase();
  renderGrid(listBarang.filter(p => p.nama.toLowerCase().includes(q)), 'homeGrid');
}

function searchFood() {
  let q = document.getElementById('searchFood').value.toLowerCase();
  renderGrid(listBarang.filter(p => p.kat === 'food' && p.nama.toLowerCase().includes(q)), 'foodGrid');
}

function searchOutfit() {
  let q = document.getElementById('searchOutfit').value.toLowerCase();
  renderGrid(listBarang.filter(p => p.kat === 'outfit' && p.nama.toLowerCase().includes(q)), 'outfitGrid');
}

function filterFood(sub, el) {
  document.querySelectorAll('#food .subtab').forEach(s => s.classList.remove('active'));
  if(el) el.classList.add('active');
  
  if(sub === 'semua') {
    renderGrid(listBarang.filter(p => p.kat === 'food'), 'foodGrid');
  } else {
    renderGrid(listBarang.filter(p => p.kat === 'food' && p.sub === sub), 'foodGrid');
  }
}

function filterOutfit(sub, el) {
  document.querySelectorAll('#outfit .subtab').forEach(s => s.classList.remove('active'));
  if(el) el.classList.add('active');
  
  if(sub === 'semua') {
    renderGrid(listBarang.filter(p => p.kat === 'outfit'), 'outfitGrid');
  } else {
    renderGrid(listBarang.filter(p => p.kat === 'outfit' && p.sub === sub), 'outfitGrid');
  }
}
