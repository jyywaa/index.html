// Initial State & Data LocalStorage
let listBarang = JSON.parse(localStorage.getItem('mochi_barang')) || [
  { id: 'BRG-01', nama: 'Es Krim Mochi', kategori: 'food', hargaBeli: 10000, hargaJual: 15000, stok: 40 },
  { id: 'BRG-02', nama: 'Cardigan Pink', kategori: 'outfit', hargaBeli: 80000, hargaJual: 120000, stok: 15 }
];

let listSupplier = JSON.parse(localStorage.getItem('mochi_supplier')) || [
  { id: 'SUP-01', nama: 'PT Mochi Suksess', telp: '08123456789', alamat: 'Bandung' }
];

let listPembelian = JSON.parse(localStorage.getItem('mochi_pembelian')) || [
  { nota: 'INV-2026001', tgl: '2026-08-19', barang: 'Es Krim Mochi', supplier: 'PT Mochi Suksess', qty: 20, total: 200000 }
];

let listPesanan = JSON.parse(localStorage.getItem('mochi_pesanan')) || [
  { id: 101, pembeli: 'Syera', total: 120000, status: 'Dikemas' }
];

// Helper Toast & Navigasi
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function login() {
  let u = document.getElementById('username').value;
  let p = document.getElementById('password').value;
  if (u === 'meila' && p === 'meila123') {
    showPage('adminPage');
    refreshAdminData();
  } else if (u === 'customer' && p === '123') {
    showPage('customerPage');
    renderCustomerProducts();
  } else {
    toast('Username / Password Salah!');
  }
}

function logout() {
  showPage('loginPage');
}

function showAdminSection(secId, el) {
  document.querySelectorAll('.admin-sec').forEach(s => s.classList.add('hidden'));
  document.getElementById(secId).classList.remove('hidden');
  document.querySelectorAll('.sidebar-menu li').forEach(l => l.classList.remove('active'));
  if(el) el.classList.add('active');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}

// RENDER DATA TABEL ADMIN
function refreshAdminData() {
  // Stats Dashboard
  document.getElementById('totalBarang').innerText = listBarang.length;
  document.getElementById('totalStok').innerText = listBarang.reduce((a,b) => a + Number(b.stok), 0);
  document.getElementById('totalSupplier').innerText = listSupplier.length;
  document.getElementById('totalPesanan').innerText = listPesanan.length;

  // Tabel Barang
  document.getElementById('tabelBarang').innerHTML = listBarang.map(b => `
    <tr>
      <td>${b.id}</td>
      <td><b>${b.nama}</b></td>
      <td><span class="btn btn-sm btn-info">${b.kategori}</span></td>
      <td>${b.stok} Pcs</td>
      <td>
        <button class="btn btn-sm btn-warning" onclick="editBarang('${b.id}')"><i class="fa-solid fa-pen"></i></button>
        <button class="btn btn-sm btn-danger" onclick="hapusBarang('${b.id}')"><i class="fa-solid fa-trash"></i></button>
      </td>
    </tr>
  `).join('');

  // Tabel Harga
  document.getElementById('tabelHarga').innerHTML = listBarang.map(b => `
    <tr>
      <td>${b.id}</td>
      <td>${b.nama}</td>
      <td>Rp ${Number(b.hargaBeli).toLocaleString()}</td>
      <td><b style="color:var(--primary)">Rp ${Number(b.hargaJual).toLocaleString()}</b></td>
      <td>
        <button class="btn btn-sm btn-warning" onclick="openModalHarga('${b.id}', ${b.hargaJual})"><i class="fa-solid fa-pen"></i> Edit Harga</button>
      </td>
    </tr>
  `).join('');

  // Tabel Supplier
  document.getElementById('tabelSupplier').innerHTML = listSupplier.map(s => `
    <tr>
      <td>${s.id}</td>
      <td><b>${s.nama}</b></td>
      <td>${s.telp}</td>
      <td>${s.alamat}</td>
      <td>
        <button class="btn btn-sm btn-danger" onclick="hapusSupplier('${s.id}')"><i class="fa-solid fa-trash"></i></button>
      </td>
    </tr>
  `).join('');

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
      <td>#MCH-${p.id}</td>
      <td>${p.pembeli}</td>
      <td>Rp ${Number(p.total).toLocaleString()}</td>
      <td><b>${p.status}</b></td>
      <td>
        <select onchange="ubahStatusPesanan(${p.id}, this.value)">
          <option value="Dikemas" ${p.status==='Dikemas'?'selected':''}>Dikemas</option>
          <option value="Dikirim" ${p.status==='Dikirim'?'selected':''}>Dikirim</option>
          <option value="Selesai" ${p.status==='Selesai'?'selected':''}>Selesai</option>
        </select>
      </td>
    </tr>
  `).join('');
}

// LOGIKA KELOLA BARANG
function openModalBarang() {
  document.getElementById('editBarangId').value = '';
  document.getElementById('modalBarangTitle').innerText = 'Input Barang';
  document.getElementById('inputNamaBarang').value = '';
  document.getElementById('inputKategoriBarang').value = '';
  document.getElementById('inputHargaBeli').value = '';
  document.getElementById('inputHargaJual').value = '';
  document.getElementById('inputStokBarang').value = '';
  document.getElementById('modalBarang').classList.add('active');
}

function simpanBarang() {
  let id = document.getElementById('editBarangId').value;
  let nama = document.getElementById('inputNamaBarang').value;
  let kategori = document.getElementById('inputKategoriBarang').value;
  let hargaBeli = document.getElementById('inputHargaBeli').value;
  let hargaJual = document.getElementById('inputHargaJual').value;
  let stok = document.getElementById('inputStokBarang').value;

  if(!nama || !hargaJual) return toast('Harap isi semua bidang!');

  if(id) {
    let b = listBarang.find(x => x.id === id);
    b.nama = nama; b.kategori = kategori; b.hargaBeli = hargaBeli; b.hargaJual = hargaJual; b.stok = stok;
    toast('Barang Berhasil Diubah!');
  } else {
    listBarang.push({
      id: 'BRG-' + (listBarang.length + 1), nama, kategori, hargaBeli, hargaJual, stok
    });
    toast('Barang Baru Tersimpan!');
  }

  localStorage.setItem('mochi_barang', JSON.stringify(listBarang));
  closeModal('modalBarang');
  refreshAdminData();
}

function editBarang(id) {
  let b = listBarang.find(x => x.id === id);
  document.getElementById('editBarangId').value = b.id;
  document.getElementById('modalBarangTitle').innerText = 'Edit Barang ('+b.id+')';
  document.getElementById('inputNamaBarang').value = b.nama;
  document.getElementById('inputKategoriBarang').value = b.kategori;
  document.getElementById('inputHargaBeli').value = b.hargaBeli;
  document.getElementById('inputHargaJual').value = b.hargaJual;
  document.getElementById('inputStokBarang').value = b.stok;
  document.getElementById('modalBarang').classList.add('active');
}

function hapusBarang(id) {
  listBarang = listBarang.filter(b => b.id !== id);
  localStorage.setItem('mochi_barang', JSON.stringify(listBarang));
  toast('Barang Dihapus');
  refreshAdminData();
}

// LOGIKA EDIT HARGA
function openModalHarga(id, hargaSekarang) {
  document.getElementById('editHargaId').value = id;
  document.getElementById('inputEditHargaJual').value = hargaSekarang;
  document.getElementById('modalHarga').classList.add('active');
}

function simpanHargaBaru() {
  let id = document.getElementById('editHargaId').value;
  let hargaBaru = document.getElementById('inputEditHargaJual').value;
  let b = listBarang.find(x => x.id === id);
  b.hargaJual = hargaBaru;

  localStorage.setItem('mochi_barang', JSON.stringify(listBarang));
  toast('Harga Jual Diperbarui!');
  closeModal('modalHarga');
  refreshAdminData();
}

// LOGIKA KELOLA SUPPLIER
function openModalSupplier() {
  document.getElementById('inputNamaSupplier').value = '';
  document.getElementById('inputTelpSupplier').value = '';
  document.getElementById('inputAlamatSupplier').value = '';
  document.getElementById('modalSupplier').classList.add('active');
}

function simpanSupplier() {
  let nama = document.getElementById('inputNamaSupplier').value;
  let telp = document.getElementById('inputTelpSupplier').value;
  let alamat = document.getElementById('inputAlamatSupplier').value;

  if(!nama) return toast('Isi nama supplier!');
  listSupplier.push({ id: 'SUP-0' + (listSupplier.length + 1), nama, telp, alamat });
  localStorage.setItem('mochi_supplier', JSON.stringify(listSupplier));
  toast('Supplier Berhasil Ditambahkan!');
  closeModal('modalSupplier');
  refreshAdminData();
}

function hapusSupplier(id) {
  listSupplier = listSupplier.filter(s => s.id !== id);
  localStorage.setItem('mochi_supplier', JSON.stringify(listSupplier));
  toast('Supplier Dihapus');
  refreshAdminData();
}

// LOGIKA PEMBELIAN & STOK MASUK
function openModalPembelian() {
  let selectB = document.getElementById('selectBarangPembelian');
  let selectS = document.getElementById('selectSupplierPembelian');
  selectB.innerHTML = listBarang.map(b => `<option value="${b.nama}">${b.nama}</option>`).join('');
  selectS.innerHTML = listSupplier.map(s => `<option value="${s.nama}">${s.nama}</option>`).join('');
  document.getElementById('modalPembelian').classList.add('active');
}

function simpanPembelian() {
  let barang = document.getElementById('selectBarangPembelian').value;
  let supplier = document.getElementById('selectSupplierPembelian').value;
  let qty = Number(document.getElementById('inputQtyPembelian').value);
  let total = document.getElementById('inputTotalBeli').value;

  if(!qty || qty <= 0) return toast('Isi jumlah stok masuk!');

  // Otomatis Tambah Stok
  let b = listBarang.find(x => x.nama === barang);
  if(b) b.stok = Number(b.stok) + qty;

  listPembelian.push({
    nota: 'INV-' + Date.now().toString().slice(-6),
    tgl: new Date().toISOString().split('T')[0],
    barang, supplier, qty, total
  });

  localStorage.setItem('mochi_barang', JSON.stringify(listBarang));
  localStorage.setItem('mochi_pembelian', JSON.stringify(listPembelian));
  toast('Pembelian Berhasil & Stok Bertambah!');
  closeModal('modalPembelian');
  refreshAdminData();
}

function ubahStatusPesanan(id, val) {
  let p = listPesanan.find(x => x.id === id);
  if(p) p.status = val;
  localStorage.setItem('mochi_pesanan', JSON.stringify(listPesanan));
  toast('Status Pesanan Diperbarui');
}

// LOGIKA TAMPILAN CUSTOMER
function renderCustomerProducts() {
  const grid = document.getElementById('customerProductGrid');
  grid.innerHTML = listBarang.map(b => `
    <div class="card-cus">
      <img src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80">
      <div class="info">
        <div style="font-weight:700">${b.nama}</div>
        <div class="price">Rp ${Number(b.hargaJual).toLocaleString()}</div>
        <div style="font-size:11px; color:#888;">Stok: ${b.stok}</div>
        <button class="btn btn-primary btn-block btn-sm" style="margin-top:6px;" onclick="toast('Berhasil dibeli!')">Beli</button>
      </div>
    </div>
  `).join('');
}
