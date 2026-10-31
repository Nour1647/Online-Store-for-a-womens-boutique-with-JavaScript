var inputEmail = document.getElementById('input-email');
var inputPass = document.getElementById('input-pass');
var btnSend = document.getElementById('send');

btnSend.addEventListener('click', Send);
function Send(e) {
    if (e) e.preventDefault();
    var emailStorage = localStorage.getItem('Email');
    var passStorage = localStorage.getItem('Pass');

    if (inputEmail.value.trim() === emailStorage && inputPass.value.trim() === passStorage) {
        setTimeout(() => {
            location = 'index.html';
        }, 1000);
    } else {
        alert('Invalid Email or Password');
    }
}