// Katalog Khusus HP (Oppo, Samsung, Realme, Xiaomi, iPhone)
const defaultProducts = [
    {
        id: 101,
        name: "OPPO Reno 11 Pro 5G",
        price: 8999000,
        desc: "Kamera 50MP Sony IMX890 OIS, Chipset Dimensity 8200, Charging 80W SuperVOOC, RAM 12GB.",
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop",
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        rating: 4.9,
        sold: 215,
        bestseller: true,
        colors: ["Pearl White", "Rock Grey"],
        specs: ["256GB", "512GB"],
        reviews: [
            { user: "Budi_S", comment: "Hasil foto portrait kamera OPPO mantap banget! Pengisian baterai juga ngebut." },
            { user: "Rina99", comment: "Desain bodi belakangnya mewah. Pengiriman cepat." }
        ]
    },
    {
        id: 102,
        name: "Samsung Galaxy S24 Ultra",
        price: 19990000,
        desc: "Layar Dynamic AMOLED 2X 120Hz, Snapdragon 8 Gen 3, Kamera 200MP + AI Zoom, Built-in S-Pen.",
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop",
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        rating: 5.0,
        sold: 430,
        bestseller: true,
        colors: ["Titanium Gray", "Titanium Violet", "Titanium Black"],
        specs: ["256GB", "512GB", "1TB"],
        reviews: [
            { user: "GadgetFreak", comment: "HP flagship terbaik tahun ini. Fitur AI-nya sangat membantu produktivitas." },
            { user: "Andri_K", comment: "Kamera 200MP ga main-main, detail banget pas di-zoom!" }
        ]
    },
    {
        id: 103,
        name: "Realme 12 Pro+ 5G",
        price: 6499000,
        desc: "Periscope Portrait Camera 64MP, Snapdragon 7s Gen 2, Design Luxury Watch Leather Back.",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop",
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        rating: 4.8,
        sold: 180,
        bestseller: false,
        colors: ["Submarine Blue", "Navigator Beige"],
        specs: ["256GB", "512GB"],
        reviews: [
            { user: "Deni_Realme", comment: "Kamera periskop di harga 6 jutaan gokil banget! Bodi belakang kulit sintetis mantap." }
        ]
    },
    {
        id: 104,
        name: "Xiaomi POCO F6 Pro",
        price: 7299000,
        desc: "Snapdragon 8 Gen 2, Layar Flow AMOLED 2K 120Hz, Fast Charging 120W HyperCharge, LiquidCool 3.0.",
        image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=500&auto=format&fit=crop",
        video: "",
        rating: 4.7,
        sold: 310,
        bestseller: false,
        colors: ["Black", "White"],
        specs: ["256GB RAM 12GB", "512GB RAM 16GB"],
        reviews: [
            { user: "GamerSejati", comment: "Main MLBB dan Genshin Impact rata kanan lancar jaya tanpa panas." }
        ]
    },
    {
        id: 105,
        name: "iPhone 15 Pro Max",
        price: 22999000,
        desc: "Bodi Bahan Titanium, Chip A17 Pro, Kamera 48MP dengan 5x Optical Zoom, USB-C Port Type 3.0.",
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop",
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyflights.mp4",
        rating: 4.9,
        sold: 520,
        bestseller: true,
        colors: ["Natural Titanium", "Blue Titanium", "Black Titanium"],
        specs: ["256GB", "512GB"],
        reviews: [
            { user: "Siska_A", comment: "Ringan banget karena titanium, warna natural titanium-nya estetik parah." },
            { user: "Kevin98", comment: "Video recording paling stabil, ga butuh gimbal lagi." }
        ]
    }
];

// Data Pesanan Awal untuk Simulasi Tracking
const defaultOrders = [
    {
        id: "ORD-1001",
        date: "11/08/2026",
        status: "dikemas",
        statusText: "Dikemas oleh penjual",
        items: [{ name: "OPPO Reno 11 Pro 5G", price: 8999000, qty: 1 }],
        total: 9019000
    },
    {
        id: "ORD-1002",
        date: "10/08/2026",
        status: "dikirim",
        statusText: "Paket dalam perjalanan (Kurir: J&T Express)",
        items: [{ name: "Samsung Galaxy S24 Ultra", price: 19990000, qty: 1 }],
        total: 20010000
    }
];

let state = {
    user: JSON.parse(localStorage.getItem('app_user')) || null,
    products: JSON.parse(localStorage.getItem('app_products')) || defaultProducts,
    cart: JSON.parse(localStorage.getItem('app_cart')) || [],
    orders: JSON.parse(localStorage.getItem('app_orders')) || defaultOrders,
    wizardStep: 1,
    selectedVariations: {},
    currentOrderFilter: 'semua'
};

function saveState() {
    localStorage.setItem('app_user', JSON.stringify(state.user));
    localStorage.setItem('app_products', JSON.stringify(state.products));
    localStorage.setItem('app_cart', JSON.stringify(state.cart));
    localStorage.setItem('app_orders', JSON.stringify(state.orders));
    updateUI();
}

function updateUI() {
    renderProducts();
    renderCart();
    renderOrders();
    updateProfileInfo();
}

// Toast & Modals
function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
    container.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function switchTab(tabName, el) {
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));

    document.getElementById(`view-${tabName}`).classList.add('active');
    if(el) el.classList.add('active');
}

function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }

// Login & Onboarding
function checkOnboarding() {
    if (!state.user) {
        document.getElementById('modal-onboarding').classList.add('active');
    } else {
        document.getElementById('modal-onboarding').classList.remove('active');
        document.getElementById('user-header-name').innerText = state.user.username;

        if (state.user.role === 'admin') {
            document.getElementById('admin-panel').style.display = 'block';
            document.getElementById('admin-divider').style.display = 'block';
        } else {
            document.getElementById('admin-panel').style.display = 'none';
            document.getElementById('admin-divider').style.display = 'none';
        }
    }
}

function handleWizardStep(e) {
    e.preventDefault();
    if (state.wizardStep === 1) {
        state.wizardStep = 2;
        document.getElementById('wizard-step-1').style.display = 'none';
        document.getElementById('wizard-step-2').style.display = 'block';
        document.getElementById('wizard-subtitle').innerText = "Langkah 2 dari 3: Buat Akun Anda";
        document.getElementById('wiz-username').required = true;
        document.getElementById('wiz-password').required = true;
    } else if (state.wizardStep === 2) {
        state.wizardStep = 3;
        document.getElementById('wizard-step-2').style.display = 'none';
        document.getElementById('wizard-step-3').style.display = 'block';
        document.getElementById('wizard-subtitle').innerText = "Langkah 3 dari 3: Nomor Kontak";
        document.getElementById('wiz-phone').required = true;
        document.getElementById('wiz-btn-next').innerText = "Selesai & Belanja";
    } else if (state.wizardStep === 3) {
        const email = document.getElementById('wiz-email').value;
        const username = document.getElementById('wiz-username').value;
        const pass = document.getElementById('wiz-password').value;
        const phone = document.getElementById('wiz-phone').value;

        let role = "customer";
        if (username === "meila" && pass === "meila123") {
            role = "admin";
        }

        state.user = { email, username, phone, role };
        saveState();
        showToast(`Selamat datang, ${state.user.username}!`);
        checkOnboarding();
    }
}

function updateProfileInfo() {
    if (state.user) {
        document.getElementById('profile-username').innerText = state.user.username;
        document.getElementById('profile-email').innerText = state.user.email;
        document.getElementById('profile-phone').innerText = state.user.phone;
        document.getElementById('profile-role-tag').innerText = state.user.role === 'admin' ? 'Administrator' : 'VIP Member';
    }
}

function confirmLogout() {
    state.user = null;
    state.wizardStep = 1;
    localStorage.removeItem('app_user');
    location.reload();
}

function formatRupiah(num) {
    return "Rp " + num.toLocaleString('id-ID');
}

// Filter Status Pesanan Interaktif (Mirip Shopee)
function filterOrders(status) {
    state.currentOrderFilter = status;
    const titleMap = {
        'semua': '📦 Semua Pesanan Anda',
        'belum_bayar': '💳 Pesanan Belum Bayar',
        'dikemas': '📦 Pesanan Sedang Dikemas',
        'dikirim': '🚚 Pesanan Dalam Pengiriman',
        'penilaian': '⭐ Pesanan Menunggu Penilaian'
    };
    document.getElementById('order-section-title').innerText = titleMap[status] || '📦 Status Pesanan Anda';
    renderOrders();
}

function renderOrders() {
    const container = document.getElementById('orders-container');
    if(!container) return;
    container.innerHTML = '';

    let filtered = state.orders;
    if (state.currentOrderFilter !== 'semua') {
        filtered = state.orders.filter(o => o.status === state.currentOrderFilter);
    }

    if (filtered.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding: 20px; color: var(--text-muted); font-size: 12px;">Tidak ada pesanan di kategori ini.</div>`;
        return;
    }

    filtered.forEach(order => {
        let badgeColor = '#ff9800';
        if(order.status === 'dikirim') badgeColor = '#2196F3';
        if(order.status === 'penilaian') badgeColor = '#4CAF50';
        if(order.status === 'belum_bayar') badgeColor = '#f44336';

        const itemDetails = order.items.map(i => `<div style="font-size: 12px;">• ${i.name} (x${i.qty})</div>`).join('');

        container.innerHTML += `
            <div class="card" style="margin-top: 10px; border-left: 4px solid ${badgeColor};">
                <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 6px;">
                    <strong>ID: ${order.id}</strong>
                    <span style="color: ${badgeColor}; font-weight: bold; text-transform: uppercase;">${order.statusText}</span>
                </div>
                ${itemDetails}
                <div style="margin-top: 8px; font-weight: bold; font-size: 13px; color: var(--primary);">
                    Total: ${formatRupiah(order.total)}
                </div>
            </div>
        `;
    });
}

// Upload File & Simpan Produk Admin
function handleAdminSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('admin-name').value;
    const desc = document.getElementById('admin-desc').value;
    const price = parseInt(document.getElementById('admin-price').value);

    const imgFile = document.getElementById('admin-image-file').files[0];
    const videoFile = document.getElementById('admin-video-file').files[0];

    if (!imgFile) {
        showToast("⚠️ Silakan upload gambar produk!");
        return;
    }

    const readerImg = new FileReader();
    readerImg.onload = function(eImg) {
        const imgBase64 = eImg.target.result;

        const processSave = (videoBase64 = "") => {
            const newProd = {
                id: Date.now(),
                name: name,
                price: price,
                desc: desc,
                image: imgBase64,
                video: videoBase64,
                rating: 5.0,
                sold: 0,
                bestseller: false,
                colors: ["Default Color"],
                specs: ["Standard Spec"],
                reviews: []
            };

            state.products.unshift(newProd);
            saveState();
            document.getElementById('admin-form').reset();
            showToast("✅ Produk berhasil disimpan!");
        };

        if (videoFile) {
            const readerVideo = new FileReader();
            readerVideo.onload = function(eVideo) {
                processSave(eVideo.target.result);
            };
            readerVideo.readAsDataURL(videoFile);
        } else {
            processSave("");
        }
    };

    readerImg.readAsDataURL(imgFile);
}

// Render Produk & Detail
function selectChip(btn, productId, type, value) {
    const parent = btn.parentElement;
    parent.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
    btn.classList.add('selected');

    if (!state.selectedVariations[productId]) {
        state.selectedVariations[productId] = {};
    }
    state.selectedVariations[productId][type] = value;
}

function renderProducts() {
    const bestsellerContainer = document.getElementById('bestseller-list');
    const gridContainer = document.getElementById('product-grid');

    if (!bestsellerContainer || !gridContainer) return;

    bestsellerContainer.innerHTML = '';
    gridContainer.innerHTML = '';

    state.products.forEach(p => {
        if(!state.selectedVariations[p.id]) {
            state.selectedVariations[p.id] = {
                color: p.colors ? p.colors[0] : '',
                spec: p.specs ? p.specs[0] : ''
            };
        }

        // 1. DOKUMEN VIDEO DEMO
        const videoHtml = p.video ? `
            <div style="margin-top: 6px;">
                <span style="font-size: 10px; color: var(--text-muted); display: block; margin-bottom: 2px;">🎥 Video Demo:</span>
                <video class="product-video" controls muted poster="${p.image}" style="width: 100%; border-radius: 6px; max-height: 140px; background: #000;">
                    <source src="${p.video}" type="video/mp4">
                </video>
            </div>` : '';

        // 2. ULASAN / KOMEN PEMBELI
        const commentsHtml = p.reviews && p.reviews.length > 0 ? `
            <div style="margin-top: 6px; padding: 6px; background: rgba(255,255,255,0.05); border-radius: 6px; font-size: 10px;">
                <strong style="color: var(--accent);">💬 Ulasan Terbaru:</strong>
                <div style="color: var(--text-muted); font-style: italic;">"${p.reviews[0].comment}" - <b>${p.reviews[0].user}</b></div>
            </div>
        ` : '';

        // CARD PRODUK HP
        const productHtml = `
            <div class="product-card">
                <!-- FOTO HP -->
                <img src="${p.image}" alt="${p.name}" style="width:100%; height:160px; object-fit:cover; border-radius:8px;">
                <div class="product-info">
                    <!-- NAMA HP -->
                    <div class="product-title">${p.name}</div>
                    
                    <!-- HARGA HP -->
                    <div class="product-price">${formatRupiah(p.price)}</div>
                    
                    <!-- DESKRIPSI HP -->
                    <div class="product-desc">${p.desc}</div>
                    
                    <!-- BINTANG / RATING & TERJUAL -->
                    <div class="product-meta" style="margin-top: 4px;">
                        <span>⭐ <b>${p.rating}</b></span>
                        <span>Terjual ${p.sold}</span>
                    </div>

                    <!-- VIDEO DEMO HP -->
                    ${videoHtml}

                    <!-- KOMEN PEMBELI -->
                    ${commentsHtml}

                    <div class="product-actions" style="margin-top: 8px;">
                        <button class="btn btn-outline" onclick="addToCart(${p.id})">+ Keranjang</button>
                        <button class="btn btn-accent" onclick="directBuy(${p.id})">Beli</button>
                    </div>
                    <button class="btn btn-outline" style="margin-top: 4px; font-size:10px; padding:4px;" onclick="openDetail(${p.id})">Detail & Variasi Warna</button>
                </div>
            </div>
        `;

        gridContainer.innerHTML += productHtml;

        if (p.bestseller) {
            bestsellerContainer.innerHTML += `
                <div class="scroll-item">
                    <img src="${p.image}" style="width:100%; height:90px; object-fit:cover; border-radius:6px;">
                    <div style="font-size:12px; font-weight:bold; margin-top:4px;" class="product-title">${p.name}</div>
                    <div style="font-size:11px; color:var(--primary); font-weight:bold;">${formatRupiah(p.price)}</div>
                    <button class="btn btn-accent" style="font-size:10px; padding:4px; margin-top:4px;" onclick="openDetail(${p.id})">Lihat</button>
                </div>
            `;
        }
    });
}

function openDetail(id) {
    const p = state.products.find(item => item.id === id);
    if (!p) return;

    const allReviews = p.reviews && p.reviews.length > 0 
        ? p.reviews.map(r => `<div style="font-size:11px; margin-top:4px; padding:4px; background:rgba(255,255,255,0.05); border-radius:4px;"><b>${r.user}:</b> ${r.comment}</div>`).join('')
        : '<div style="font-size:11px; color:var(--text-muted);">Belum ada ulasan.</div>';

    const detailContent = document.getElementById('detail-content');
    detailContent.innerHTML = `
        <img src="${p.image}" style="width:100%; max-height:200px; object-fit:cover; border-radius:8px;">
        <h3 style="margin-top:8px;">${p.name}</h3>
        <p style="color:var(--primary); font-weight:bold; font-size:16px;">${formatRupiah(p.price)}</p>
        <p style="font-size:11px; color:var(--accent);">⭐ Rating: ${p.rating} / 5.0 (${p.sold} Terjual)</p>
        <p style="font-size:12px; color:var(--text-muted); margin:8px 0;">${p.desc}</p>

        <div style="margin-top:10px;">
            <label style="font-size:11px; font-weight:bold;">Pilih Warna HP:</label>
            <div style="display:flex; gap:6px; margin-top:4px;">
                ${(p.colors || ['Default']).map(c => `<button class="chip ${state.selectedVariations[p.id].color === c ? 'selected' : ''}" onclick="selectChip(this, ${p.id}, 'color', '${c}')">${c}</button>`).join('')}
            </div>
        </div>

        <div style="margin-top:10px;">
            <label style="font-size:11px; font-weight:bold;">Pilih Penyimpanan (ROM):</label>
            <div style="display:flex; gap:6px; margin-top:4px;">
                ${(p.specs || ['Default']).map(s => `<button class="chip ${state.selectedVariations[p.id].spec === s ? 'selected' : ''}" onclick="selectChip(this, ${p.id}, 'spec', '${s}')">${s}</button>`).join('')}
            </div>
        </div>

        <div style="margin-top:14px; border-top:1px solid var(--border); padding-top:8px;">
            <label style="font-size:11px; font-weight:bold;">💬 Kumpulan Ulasan Pembeli:</label>
            ${allReviews}
        </div>

        <button class="btn btn-accent" style="margin-top:16px;" onclick="addToCart(${p.id}); closeModal('modal-detail');">Tambah ke Keranjang</button>
    `;

    openModal('modal-detail');
}

// Keranjang Belanja & Checkout
function addToCart(productId) {
    const p = state.products.find(item => item.id === productId);
    if (!p) return;

    const selectedVar = state.selectedVariations[productId] || {};
    const existing = state.cart.find(item => item.id === productId && item.color === selectedVar.color && item.spe