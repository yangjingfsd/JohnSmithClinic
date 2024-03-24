/* For validating the registration form 
    Author: Jing Yang
    Date: Mar 14, 2024
*/

'use strict';
let pwdform = document.getElementById('pwd');
let pwdconfirm = document.getElementById('pwdconf');
let emailelem = document.getElementById('email-address');
let fnamelem = document.getElementById('first-name');
let lnamelem = document.getElementById('last-name');

let secueKey = new Map([
    ["john@smith.com","123456"],
    ["jing@yang.com","654321"],
    ["tom@cloud.com","abcdef"],
    ["jim@rain.com","fedcba"]
]
);

function validateForm(){

    let regemail = emailelem.value;
    
    if(secueKey.has(regemail)){
        alert('User ' + regemail + ' already registered, please use another email.');
        return false;
    } else {
    if(pwdform.value == pwdconfirm.value){
        localStorage.setItem('username', emailelem.value);
        localStorage.setItem('password', pwdconfirm.value);
        localStorage.setItem('firstname', fnamelem.value);
        localStorage.setItem('lastname', lnamelem.value);
        return true;
    } else
    {
        alert('Passwords do not match! please try again.')
        return false;
    }
}
}