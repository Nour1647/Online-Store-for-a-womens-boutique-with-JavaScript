var links1 = document.getElementById('links-1');
var links2 = document.getElementById('links-2');
var userName = document.querySelector('#links-2 h2');
var logout = document.getElementById('logout');
var container = document.getElementById('container');

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

var Wishlist = JSON.parse(localStorage.getItem('Wishlist')) || [];
var Products = JSON.parse(localStorage.getItem('Products')) || [];

function DrawWishlist() {
    if (Wishlist.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                <div style="font-size: 50px; margin-bottom: 15px;">🤍</div>
                <h3 style="color: #831843; font-family: 'Playfair Display', serif; font-size: 22px; margin-bottom: 8px;">قائمة المفضلة فارغة حالياً</h3>
                <p style="color: #64748b; font-size: 14px; margin-bottom: 20px;">لم تقمي بإضافة أي منتج إلى المفضلة بعد.</p>
                <a href="index.html" style="background: linear-gradient(135deg, #be185d, #e11d48); color: #fff; text-decoration: none; padding: 10px 25px; border-radius: 999px; font-weight: 600; font-size: 14px;">تصفح المنتجات ✨</a>
            </div>
        `;
        return;
    }

    var x = Wishlist.map((item) => {
        return (`
        <div class="box" style="position: relative;">
            <span style="position: absolute; top: 12px; right: 12px; background: #e11d48; color: #fff; padding: 4px 12px; border-radius: 999px; font-size: 13px; font-weight: bold; box-shadow: 0 4px 10px rgba(225,29,72,0.3);">
                -${item.discount}% OFF
            </span>

            <img src="${item.image}" alt="${item.title}">
            <div class="info">
                <h2>${item.title}</h2>
                <p>${item.text}</p>

                <p class="price">
                    Price:
                    <del style="color: #9ca3af; font-size: 14px; font-weight: normal; margin-right: 6px;">$${item.oldPrice}</del>
                    <span style="color: #be185d; font-weight: bold; font-size: 18px;">$${item.price}</span>
                </p>

                <div style="display: flex; gap: 10px; margin-top: 15px;">
                    <button type="button" onClick="MoveToCart(${item.id})" style="flex: 2; background: linear-gradient(135deg, #be185d, #e11d48); color: white; border: none; padding: 10px; border-radius: 999px; font-weight: 600; cursor: pointer; font-size: 13px;">Add to Bag</button>
                    <button type="button" onClick="RemoveFromWishlist(${item.id})" style="flex: 1; background: #fee2e2; color: #b91c1c; border: none; padding: 10px; border-radius: 999px; font-weight: 600; cursor: pointer; font-size: 13px;">حذف</button>
                </div>
            </div>
        </div>
        `);
    }).join('');

    container.innerHTML = x;
}
DrawWishlist();

function RemoveFromWishlist(id) {
    Wishlist = Wishlist.filter((item) => item.id !== id);
    localStorage.setItem('Wishlist', JSON.stringify(Wishlist));
    DrawWishlist();
}

function MoveToCart(id) {
    var product = Wishlist.find((item) => item.id === id);
    if (!product) return;

    var existingProduct = Products.find((e) => e.id === id);
    if (existingProduct) {
        existingProduct.qty = (Number(existingProduct.qty) || 1) + 1;
    } else {
        Products.push({ ...product, qty: 1 });
    }

    localStorage.setItem('Products', JSON.stringify(Products));

    RemoveFromWishlist(id);

    alert('تم نقل المنتج إلى حقيبة التسوق بنجاح ✨');
}