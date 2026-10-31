var links1 = document.getElementById('links-1');
var links2 = document.getElementById('links-2');
var userName = document.querySelector('#links-2 h2');
var logout = document.getElementById('logout');
var container = document.getElementById('container');
var totalPriceContainer = document.getElementById('total-price-container');
var data = JSON.parse(localStorage.getItem('Products')) || [];

if (localStorage.getItem('FirstName')) {
    links1.style.display = 'none';
    links2.style.display = 'block';
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

function Draw() {
    if (data.length === 0) {
        container.innerHTML = "<p style='text-align:center; padding:40px; color:#9d174d; font-size:18px; grid-column: 1 / -1;'>Your shopping bag is empty 🌸</p>";
        if (totalPriceContainer) totalPriceContainer.style.display = "none";
        return;
    }

    if (totalPriceContainer) totalPriceContainer.style.display = "block";

    var x = data.map((item) => {
        var qty = Number(item.qty) || 1;
        var unitPrice = Number(item.price) || 0;
        var itemTotal = unitPrice * qty;

        return (`
        <div class="box">
            <img src="${item.image}" alt="${item.title}">
            <div class="info">
                <h2>${item.title}</h2>
                <p>${item.text}</p>
                <p>Unit Price: $${unitPrice}</p>


                <div style="margin: 12px 0; display: flex; align-items: center;">
                    <button type="button" onClick="ChangeQty(${item.id}, -1)" style="padding: 4px 14px; margin: 0;">-</button>
                    <span style="margin: 0 12px; font-weight: bold; color: #831843;">Qty: ${qty}</span>
                    <button type="button" onClick="ChangeQty(${item.id}, 1)" style="padding: 4px 14px; margin: 0;">+</button>
                </div>

                <p class="price">Subtotal: $${itemTotal}</p>

                <button type="button" class="delete-btn" onClick="DeleteFromCart(${item.id})">Remove from Bag</button>
            </div>
        </div>
        `);
    }).join('');

    container.innerHTML = x;

    var totalPrice = data.reduce((sum, item) => {
        var qty = Number(item.qty) || 1;
        var price = Number(item.price) || 0;
        return sum + (price * qty);
    }, 0);

    if (totalPriceContainer) {
        totalPriceContainer.innerHTML = `
            <div style="margin-bottom: 14px; font-size: 22px; font-weight: bold; color: #831843;">
                Total Price: <span style="color: #be185d;">$${totalPrice}</span>
            </div>
            <button type="button" onClick="OpenCheckoutModal(${totalPrice})" style="background: linear-gradient(135deg, #be185d, #e11d48); color: #fff; border: none; padding: 12px 32px; border-radius: 999px; font-size: 16px; font-weight: 600; cursor: pointer; box-shadow: 0 8px 20px rgba(190, 24, 93, 0.25); font-family: 'Poppins', sans-serif;">
                Proceed to Checkout (إتمام الشراء) ✨
            </button>
        `;
    }
}
Draw();

function ChangeQty(id, delta) {
    var index = data.findIndex((item) => item.id === id);
    if (index !== -1) {
        var currentQty = Number(data[index].qty) || 1;
        var newQty = currentQty + delta;

        if (newQty <= 0) {
            data.splice(index, 1);
        } else {
            data[index].qty = newQty;
        }

        localStorage.setItem('Products', JSON.stringify(data));
        Draw();
    }
}

function DeleteFromCart(id) {
    var index = data.findIndex((item) => item.id === id);
    if (index !== -1) {
        data.splice(index, 1);
        localStorage.setItem('Products', JSON.stringify(data));
        Draw();
    }
}


function OpenCheckoutModal(totalPrice) {
    var oldModal = document.getElementById('checkout-modal');
    if (oldModal) oldModal.remove();

    var modal = document.createElement('div');
    modal.id = 'checkout-modal';
    modal.style.cssText = 'position:fixed; inset:0; background:rgba(51, 27, 44, 0.55); backdrop-filter:blur(4px); display:flex; align-items:center; justify-content:center; z-index:9999; padding:15px;';

    modal.innerHTML = `
        <div id="checkout-box" style="background:#ffffff; border:2px solid #fbcfe8; border-radius:24px; padding:28px 24px; max-width:440px; width:100%; box-shadow:0 20px 45px rgba(157,23,77,0.2); font-family:'Poppins', sans-serif; direction:rtl; text-align:right;">
            <h3 style="color:#831843; font-size:22px; margin:0 0 8px 0; text-align:center; font-family:'Playfair Display', serif;">إتمام الطلب والدفع 🛍️</h3>
            <p style="text-align:center; color:#be185d; font-weight:bold; font-size:17px; margin-bottom:18px; border-bottom:1px solid #fce7f3; padding-bottom:10px;">
                المبلغ الإجمالي المطلوب: $${totalPrice}
            </p>

            <div style="margin-bottom:12px;">
                <label style="display:block; font-size:13px; color:#831843; margin-bottom:5px; font-weight:600;">عنوان التوصيل بالتفصيل:</label>
                <input type="text" id="cust-address" placeholder="المدينة - الحي - الشارع..." style="width:100%; padding:10px 12px; border:1px solid #fbcfe8; border-radius:12px; outline:none; box-sizing:border-box; font-family:inherit;">
            </div>

            <div style="margin-bottom:14px;">
                <label style="display:block; font-size:13px; color:#831843; margin-bottom:5px; font-weight:600;">رقم الموبايل للتواصل:</label>
                <input type="tel" id="cust-phone" placeholder="09XXXXXXXX" style="width:100%; padding:10px 12px; border:1px solid #fbcfe8; border-radius:12px; outline:none; box-sizing:border-box; font-family:inherit;">
            </div>

            <div style="margin-bottom:14px;">
                <label style="display:block; font-size:13px; color:#831843; margin-bottom:5px; font-weight:600;">اختاري طريقة الدفع:</label>
                <select id="payment-method" style="width:100%; padding:10px 12px; border:1px solid #fbcfe8; border-radius:12px; outline:none; background:#fdf2f8; color:#831843; font-weight:600; cursor:pointer; font-family:inherit;">
                    <option value="cash">الدفع نقداً (عند الاستلام أو في المركز)</option>
                    <option value="transfer">تحويل مالي / كاش إلكتروني</option>
                </select>
            </div>

            <div id="payment-info-box" style="background:#fff1f2; border:1px dashed #f43f5e; border-radius:14px; padding:12px; margin-bottom:14px; font-size:13.5px; color:#881337; line-height:1.7;">
            </div>

            <p id="checkout-error" style="display:none; color:#e11d48; font-size:13px; text-align:center; margin-bottom:10px; font-weight:600;"></p>

            <div style="display:flex; gap:10px; margin-top:16px;">
                <button type="button" id="confirm-order-btn" style="flex:2; background:linear-gradient(135deg, #be185d, #e11d48); color:#fff; border:none; padding:11px; border-radius:999px; font-weight:600; cursor:pointer; font-size:14px;">تأكيد الطلب الآن</button>
                <button type="button" id="cancel-checkout-btn" style="flex:1; background:#f1f5f9; color:#64748b; border:none; padding:11px; border-radius:999px; font-weight:600; cursor:pointer; font-size:13px;">إلغاء</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    var paymentSelect = document.getElementById('payment-method');
    var paymentInfoBox = document.getElementById('payment-info-box');

    function UpdatePaymentInfo() {
        if (paymentSelect.value === 'cash') {
            paymentInfoBox.innerHTML = `
                <b>📍 مكان وطريقة الدفع:</b><br>
                • الدفع نقداً للمندوب فور استلام الطلب على عنوانك.<br>
                • أو الاستلام والدفع مباشرة في مقر البوتيك: <b>الشارع الرئيسي - طابق 1</b>.
            `;
        } else {
            paymentInfoBox.innerHTML = `
                <b>💳 بيانات التحويل المالي:</b><br>
                يرجى تحويل مبلغ <b>$${totalPrice}</b> إلى الرقم: <b style="color:#be185d; font-size:15px; letter-spacing:1px;">0999123456</b><br>
                <span style="font-size:12.5px; color:#9d174d;">(أو عبر الحوالات المالية باسم: Nour Store)</span>
                <div style="margin-top:8px;">
                    <input type="text" id="transfer-ref" placeholder="أدخلي رقم عملية التحويل أو الإشعار..." style="width:100%; padding:8px 10px; border:1px solid #f9a8d4; border-radius:8px; outline:none; background:#fff; box-sizing:border-box; font-size:12.5px;">
                </div>
            `;
        }
    }

    UpdatePaymentInfo();
    paymentSelect.addEventListener('change', UpdatePaymentInfo);

    document.getElementById('cancel-checkout-btn').onclick = function () {
        modal.remove();
    };

    document.getElementById('confirm-order-btn').onclick = function () {
        var address = document.getElementById('cust-address').value.trim();
        var phone = document.getElementById('cust-phone').value.trim();
        var errorMsg = document.getElementById('checkout-error');

        if (!address || !phone) {
            errorMsg.style.display = 'block';
            errorMsg.textContent = '⚠️ يرجى إدخال العنوان ورقم الموبايل أولاً.';
            return;
        }

        if (paymentSelect.value === 'transfer') {
            var transferRef = document.getElementById('transfer-ref').value.trim();
            if (!transferRef) {
                errorMsg.style.display = 'block';
                errorMsg.textContent = '⚠️ يرجى إدخال رقم عملية التحويل لتأكيد الدفع.';
                return;
            }
        }

        data = [];
        localStorage.removeItem('Products');
        Draw();

        var customerName = localStorage.getItem('FirstName') || 'عزيزتي';
        document.getElementById('checkout-box').innerHTML = `
            <div style="text-align:center; padding:15px 5px;">
                <div style="font-size:48px; margin-bottom:10px;">🎉</div>
                <h3 style="color:#831843; font-size:22px; margin-bottom:10px;">شكراً لكِ يا ${customerName}!</h3>
                <p style="color:#475569; font-size:14.5px; line-height:1.8; margin-bottom:20px;">
                    تم استلام طلبك بنجاح بقيمة <b style="color:#be185d;">$${totalPrice}</b>، وسنتواصل معكِ قريباً على الرقم <b>${phone}</b> لتسليم الطلب.
                </p>
                <a href="index.html" style="display:inline-block; background:linear-gradient(135deg, #be185d, #e11d48); color:#fff; text-decoration:none; padding:10px 28px; border-radius:999px; font-weight:600; font-size:14px;">العودة إلى المتجر</a>
            </div>
        `;
    };
}