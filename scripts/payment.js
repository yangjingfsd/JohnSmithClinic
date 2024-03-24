'use strict';

let aptdtl = document.getElementById('aptdetails');

aptdtl.innerHTML += "Service ID: " + localStorage.getItem('serviceID') + "<br>";
aptdtl.innerHTML += "Service: " + localStorage.getItem('aptService') + "<br>";
aptdtl.innerHTML += "Date: " + localStorage.getItem('aptDate') + "<br>";
aptdtl.innerHTML += "Time : " + localStorage.getItem('aptTime') + "<br>";
aptdtl.innerHTML += "Service Fee: " + localStorage.getItem('aptPrice') + "<br>";
