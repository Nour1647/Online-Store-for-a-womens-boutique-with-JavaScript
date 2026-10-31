var inputFname = document.getElementById('input-fname');
var inputLname = document.getElementById('input-lname');
var inputEmail = document.getElementById('input-email');
var inputPass = document.getElementById('input-pass');
var btnSend = document.getElementById('send');

btnSend.addEventListener('click', Send);
function Send(e) {
    if (e) e.preventDefault();
    if (
        inputEmail.value.trim() === '' ||
        inputFname.value.trim() === '' ||
        inputLname.value.trim() === '' ||
        inputPass.value.trim() === ''
    ) {
        alert('Please fill in all fields');
    } else {
        localStorage.setItem('FirstName', inputFname.value.trim());
        localStorage.setItem('LastName', inputLname.value.trim());
        localStorage.setItem('Email', inputEmail.value.trim());
        localStorage.setItem('Pass', inputPass.value.trim());

        setTimeout(() => {
            location = 'login.html';
        }, 1000);
    }
}