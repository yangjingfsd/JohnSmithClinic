/* Purpose: Handle the log in 
    Author: Jing Yang
      Date: March 13, 2024
*/
'use strict';

let secueKey = new Map([
    ["john@smith.com","123456"],
    ["jing@yang.com","654321"],
    ["tom@cloud.com","abcdef"],
    ["jim@rain.com","fedcba"]
]
);

let usenme = localStorage.getItem('username');
let passwd = localStorage.getItem('password');

secueKey.set(usenme,passwd);

function logincheck(){
let user = document.getElementById('emailaddr').value;
let pwd = document.getElementById('pwd').value;

if(secueKey.has(user)){

    if(pwd == secueKey.get(user)) {
        localStorage.setItem('currentuser', user);
        return true;
    } else{
        alert("Password does not match! Please try again.");
        return false;
    }

} else {
    alert("User does not exist! Please try again.");
    return false;
}

}
