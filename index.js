var links1 = document.getElementById('links-1');
var links2 = document.getElementById('links-2');
var userName = document.querySelector('#links-2 h2');
var logout = document.getElementById('logout');
var container = document.getElementById('container');
var cart = document.getElementById('cart');
var cartIcon = document.getElementById('cart-icon');
var cartDiv = document.querySelector('#cart div');
var count = document.getElementById('count');
var searchInput = document.getElementById('searchInput');
var categoryButtons = document.querySelectorAll('.category-btn');
var currentCategory = 'all';
var Wishlist = JSON.parse(localStorage.getItem('Wishlist')) || [];

if (localStorage.getItem('FirstName')) {
    links1.style.display = 'none';
    links2.style.display = 'flex';
    userName.innerHTML = localStorage.getItem('FirstName');
}

logout.addEventListener('click', Out);
function Out(e) {
    if (e) e.preventDefault();
    localStorage.clear();
    setTimeout(() => {
        location = 'signup.html';
    }, 1000);
}

var data = [
    { id: 1, title: 'Quilted Leather Bag', category: 'Bags', text: 'Elegant luxury leather handbag with a golden chain strap.', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80', oldPrice: 145, discount: 20, price: Math.round(145 * 0.80), rating: 4.8, reviewsCount: 24 },
    { id: 2, title: 'Silk Evening Dress', category: 'Dresses', text: 'Soft blush pink silk evening gown for special occasions.', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80', oldPrice: 210, discount: 25, price: Math.round(210 * 0.75), rating: 5.0, reviewsCount: 18 },
    { id: 3, title: 'Crystal Stiletto Heels', category: 'Shoes', text: 'Handcrafted high-heel pumps embellished with sparkling crystals.', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80', oldPrice: 130, discount: 20, price: Math.round(130 * 0.80), rating: 4.6, reviewsCount: 31 },
    { id: 4, title: 'Pastel Tote Handbag', category: 'Bags', text: 'Spacious everyday designer tote bag in soft pastel tones.', image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&q=80', oldPrice: 115, discount: 25, price: Math.round(115 * 0.75), rating: 4.7, reviewsCount: 15 },
    { id: 5, title: 'Chic Cashmere Blazer', category: 'Blazers', text: 'Tailored feminine blazer for a classy and modern look.', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80', oldPrice: 185, discount: 20, price: Math.round(185 * 0.80), rating: 4.9, reviewsCount: 40 },
    { id: 6, title: 'Velvet Ankle Pumps', category: 'Shoes', text: 'Comfortable luxury velvet heels with delicate ankle straps.', image: 'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=600&q=80', oldPrice: 95, discount: 25, price: Math.round(95 * 0.75), rating: 4.5, reviewsCount: 12 }
];

function Draw(items = data) {
    if (items.length === 0) {
        container.innerHTML = `<p style="width:100%; text-align:center; color:#9d174d; font-size:16px; padding:40px 0;">No matching products found ✨</p>`;
        return;
    }

    var x = items.map((item) => {
        var isFavorite = Wishlist.some((fav) => fav.id === item.id);
        var heartStyle = isFavorite ? 'color: #e11d48;' : 'color: #64748b;';

        var starsHTML = '';
        for (var i = 1; i <= 5; i++) {
            if (i <= Math.floor(item.rating)) {
                starsHTML += '<i class="fa fa-star" style="color: #fbbf24; margin-right: 2px;"></i>';
            } else {
                starsHTML += '<i class="fa fa-star-o" style="color: #d1d5db; margin-right: 2px;"></i>';
            }
        }

        return (`
        <div class="box" style="position: relative;">
            <span style="position: absolute; top: 12px; right: 12px; background: #e11d48; color: #fff; padding: 4px 12px; border-radius: 999px; font-size: 13px; font-weight: bold; box-shadow: 0 4px 10px rgba(225,29,72,0.3);">
                -${item.discount}% OFF
            </span>

            <i class="fa fa-heart" onClick="ToggleWishlist(${item.id})" style="position: absolute; top: 15px; left: 15px; font-size: 22px; cursor: pointer; ${heartStyle} transition: 0.3s; z-index: 10;" title="Add to Wishlist"></i>

            <img src="${item.image}" alt="${item.title}">
            <div class="info">
                <h2>${item.title}</h2>
                <p>${item.text}</p>


                <div style="display: flex; align-items: center; margin: 8px 0 12px 0;">
                    <div>${starsHTML}</div>
                    <span style="font-size: 12px; color: #64748b; margin-right: 6px;">(${item.rating} / ${item.reviewsCount} reviews)</span>
                </div>

                <p class="price">
                    Price:
                    <del style="color: #9ca3af; font-size: 14px; font-weight: normal; margin-right: 6px;">$${item.oldPrice}</del>
                    <span style="color: #be185d; font-weight: bold; font-size: 18px;">$${item.price}</span>
                </p>

                <div class="qty-row">
                    <label>Quantity: </label>
                    <input type="number" id="qty-${item.id}" value="1" min="1">
                </div>

                <button type="button" onClick="AddToCart(${item.id})">Add to Bag</button>
            </div>
        </div>
        `);
    }).join('');

    container.innerHTML = x;
}
Draw(data);

cartIcon.addEventListener('click', Open);
function Open() {
    if (cart.style.display == 'none' || cart.style.display === '') {
        cart.style.display = 'block';
    } else {
        cart.style.display = 'none';
    }
}

var Products = JSON.parse(localStorage.getItem('Products')) || [];

function RenderCartMenu() {
    cartDiv.innerHTML = '';
    var totalItemsCount = 0;

    Products.forEach((e) => {
        var itemQty = Number(e.qty) || 1;
        totalItemsCount += itemQty;
        cartDiv.innerHTML += `<p style="color:#831843; border-bottom: 1px solid #fce7f3; padding: 6px 0; font-size: 14px;">${e.title} <b style="color:#be185d;">(x${itemQty})</b></p>`;
    });

    if (Products.length === 0) {
        cartDiv.innerHTML = `<p style="color:#9ca3af; font-size:13px; padding:8px 0;">Your bag is empty (0)</p>`;
    }

    count.style.display = 'inline-block';
    count.innerHTML = totalItemsCount;
}
RenderCartMenu();

function ShowAuthMessage() {
    var oldModal = document.getElementById('auth-alert-modal');
    if (oldModal) oldModal.remove();

    var modal = document.createElement('div');
    modal.id = 'auth-alert-modal';
    modal.style.cssText = 'position:fixed; inset:0; background:rgba(51, 27, 44, 0.55); backdrop-filter:blur(4px); display:flex; align-items:center; justify-content:center; z-index:9999;';

    modal.innerHTML = `
        <div style="background:#ffffff; border:2px solid #fbcfe8; border-radius:24px; padding:30px 26px; max-width:400px; width:90%; text-align:center; box-shadow:0 20px 45px rgba(157,23,77,0.2); font-family:'Poppins', sans-serif;">
            <div style="font-size:40px; margin-bottom:10px;">🛍️</div>
            <h3 style="color:#831843; font-size:22px; margin-bottom:10px; font-family:'Playfair Display', serif;">يرجى تسجيل الدخول أولاً</h3>
            <p style="color:#64748b; font-size:14.5px; line-height:1.7; margin-bottom:22px;">
                لإتمام هذه العملية، يجب أن تكوني مسجلة للدخول <b>(Login)</b>، وإذا لم يكن لديكِ حساب مسبقاً يمكنكِ إنشاء حساب جديد <b>(Sign Up)</b>.
            </p>
            <div style="display:flex; gap:10px; justify-content:center; margin-bottom:12px;">
                <a href="login.html" style="flex:1; background:linear-gradient(135deg, #be185d, #e11d48); color:#fff; text-decoration:none; padding:10px 14px; border-radius:999px; font-weight:600; font-size:14px;">Login (دخول)</a>
                <a href="signup.html" style="flex:1; background:#fdf2f8; color:#9d174d; border:1px solid #f9a8d4; text-decoration:none; padding:10px 14px; border-radius:999px; font-weight:600; font-size:14px;">Sign Up (حساب جديد)</a>
            </div>
            <button type="button" id="close-auth-modal" style="background:none; border:none; color:#9ca3af; font-size:13px; cursor:pointer; text-decoration:underline; margin-top:4px;">إغلاق والبقاء في الصفحة</button>
        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('close-auth-modal').onclick = function () {
        modal.remove();
    };
}

function AddToCart(id) {
    if (!localStorage.getItem('FirstName')) {
        ShowAuthMessage();
        return;
    }

    var qtyInput = document.getElementById(`qty-${id}`);
    var selectedQty = Number(qtyInput.value);

    if (!selectedQty || selectedQty < 1) {
        selectedQty = 1;
    }

    var existingProduct = Products.find((e) => e.id === id);

    if (existingProduct) {
        existingProduct.qty = (Number(existingProduct.qty) || 1) + selectedQty;
    } else {
        var addedProduct = data.find((e) => e.id === id);
        Products.push({ ...addedProduct, qty: selectedQty });
    }

    localStorage.setItem('Products', JSON.stringify(Products));
    RenderCartMenu();

    qtyInput.value = 1;
}

function ToggleWishlist(id) {
    if (!localStorage.getItem('FirstName')) {
        ShowAuthMessage();
        return;
    }

    var index = Wishlist.findIndex((fav) => fav.id === id);

    if (index !== -1) {
        Wishlist.splice(index, 1);
    } else {
        var productToAdd = data.find((item) => item.id === id);
        if (productToAdd) {
            Wishlist.push(productToAdd);
        }
    }

    localStorage.setItem('Wishlist', JSON.stringify(Wishlist));
    FilterProducts();
}

var wishlistIcon = document.getElementById('wishlist-icon');
if (wishlistIcon) {
    wishlistIcon.addEventListener('click', function () {
        var oldModal = document.getElementById('wishlist-modal');
        if (oldModal) oldModal.remove();

        var modal = document.createElement('div');
        modal.id = 'wishlist-modal';
        modal.style.cssText = 'position:fixed; inset:0; background:rgba(51, 27, 44, 0.55); backdrop-filter:blur(4px); display:flex; align-items:center; justify-content:center; z-index:9999; padding:15px;';

        var wishlistItemsHTML = '';
        if (Wishlist.length === 0) {
            wishlistItemsHTML = `<p style="text-align:center; color:#9ca3af; padding:20px;">Your wishlist is empty 🤍</p>`;
        } else {
            wishlistItemsHTML = Wishlist.map((item) => `
                <div style="display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid #fce7f3; padding:10px 0;">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <img src="${item.image}" alt="${item.title}" style="width:50px; height:50px; object-fit:cover; border-radius:10px;">
                        <div>
                            <h4 style="margin:0; font-size:14px; color:#831843;">${item.title}</h4>
                            <span style="color:#be185d; font-size:13px; font-weight:bold;">$${item.price}</span>
                        </div>
                    </div>
                    <button type="button" onClick="RemoveFromWishlistModal(${item.id})" style="background:#fee2e2; color:#b91c1c; border:none; padding:6px 10px; border-radius:8px; cursor:pointer; font-size:12px;">حذف</button>
                </div>
            `).join('');
        }

        modal.innerHTML = `
            <div style="background:#ffffff; border:2px solid #fbcfe8; border-radius:24px; padding:24px; max-width:420px; width:100%; box-shadow:0 20px 45px rgba(157,23,77,0.2); font-family:'Poppins', sans-serif; direction:rtl; text-align:right;">
                <h3 style="color:#831843; font-size:20px; margin:0 0 15px 0; text-align:center; font-family:'Playfair Display', serif;">قائمة المفضلة 💖</h3>
                <div style="max-height:280px; overflow-y:auto; margin-bottom:15px;">
                    ${wishlistItemsHTML}
                </div>
                <button type="button" id="close-wishlist-modal" style="width:100%; background:#f1f5f9; color:#64748b; border:none; padding:10px; border-radius:999px; font-weight:600; cursor:pointer; font-size:13px;">إغلاق</button>
            </div>
        `;

        document.body.appendChild(modal);

        document.getElementById('close-wishlist-modal').onclick = function () {
            modal.remove();
        };
    });
}

function RemoveFromWishlistModal(id) {
    Wishlist = Wishlist.filter((item) => item.id !== id);
    localStorage.setItem('Wishlist', JSON.stringify(Wishlist));
    document.getElementById('wishlist-modal').remove();
    FilterProducts();
}


function FilterProducts() {
    var searchWord = searchInput ? searchInput.value.trim().toLowerCase() : '';

    var filteredData = data.filter((item) => {
        var matchesName = item.title.toLowerCase().includes(searchWord);
        var matchesCategory = (currentCategory === 'all' || item.category === currentCategory);

        return matchesName && matchesCategory;
    });

    Draw(filteredData);
}


if (searchInput) {
    searchInput.addEventListener('input', FilterProducts);
}

categoryButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
        categoryButtons.forEach((b) => {
            b.style.background = '#fff';
            b.style.color = '#831843';
        });
        this.style.background = '#be185d';
        this.style.color = '#fff';

        currentCategory = this.getAttribute('data-category');
        FilterProducts();
    });
});

var contactBtn = document.getElementById('contact-btn');

if (contactBtn) {
    contactBtn.addEventListener('click', function () {
        var oldModal = document.getElementById('contact-modal');
        if (oldModal) oldModal.remove();

        var modal = document.createElement('div');
        modal.id = 'contact-modal';
        modal.style.cssText = 'position:fixed; inset:0; background:rgba(51, 27, 44, 0.55); backdrop-filter:blur(4px); display:flex; align-items:center; justify-content:center; z-index:9999; padding:15px;';

        modal.innerHTML = `
            <div style="background:#ffffff; border:2px solid #fbcfe8; border-radius:24px; padding:28px 24px; max-width:400px; width:100%; box-shadow:0 20px 45px rgba(157,23,77,0.2); font-family:'Poppins', sans-serif; text-align:center;">
                <div style="font-size:40px; margin-bottom:10px;">💌</div>
                <h3 style="color:#831843; font-size:22px; margin-bottom:8px; font-family:'Playfair Display', serif;">Contact Us</h3>
                <p style="color:#64748b; font-size:13.5px; margin-bottom:20px;">
                    يسعدنا تواصلك معنا في أي وقت لأي استفسار أو مساعدة تخص طلبك!
                </p>
                <div style="background:#fdf2f8; border:1px solid #fbcfe8; border-radius:14px; padding:15px; margin-bottom:20px; font-size:13.5px; color:#831843; text-align:right; line-height:1.8;">
                     <b>Email : </b> support@bellarose.comn<br>
                     <b>Phone : </b> +1 (555) 123-4567<br>
                     <b>Work Time : </b> All Week  (9 Am -  10 pm)
                </div>
                <button type="button" id="close-contact-modal" style="width:100%; background:linear-gradient(135deg, #be185d, #e11d48); color:#fff; border:none; padding:11px; border-radius:999px; font-weight:600; cursor:pointer; font-size:14px;">إغلاق</button>
            </div>
        `;

        document.body.appendChild(modal);

        document.getElementById('close-contact-modal').onclick = function () {
            modal.remove();
        };
    });
}