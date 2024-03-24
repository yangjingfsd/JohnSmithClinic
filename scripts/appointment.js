/* Purpose: Choose date and time for the appointment
   Author: Jing Yang
   Date:   March 4, 2024
*/

'use strict';

let dateMsg = "";
let timeMsg = "";
let servChecked = -1;
let dateChecked = 0;
let timeChecked = 0;
let calenderDays = null;
let calDays = null;
let currMonth = "";
let currYear = "";
let curYearN = 0;
let curMonthN = 0;
let dayofMonth = 0;
let selectedDay = null;
let serItems = document.querySelectorAll("#appointmenthead input");
let servDetail = document.querySelectorAll("#serdet p");
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const weeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let calul = document.getElementById("calDays");
let monthLable = document.getElementById("calMonth");
let yearLable = document.getElementById("calYear");
let decMonth = document.getElementsByClassName("prev");
let incMonth = document.getElementsByClassName("next");

let holiday = new Map([
    ["1/1","New&nbsp;Year"],
    ["3/29","Good&nbsp;Friday"],
    ["4/1","Easter"],
    ["5/20","Victoria&nbsp;Day"],
    ["6/24","Saint-Jean-Baptiste&nbsp;Day"],
    ["7/1","Canada&nbsp;Day"],
    ["9/2","Labour&nbsp;Day"],
    ["9/30","National&nbsp;Day&nbsp;for&nbsp;Truth&nbsp;and&nbsp;Reconciliation"],
    ["10/14","Thanksgiving&nbsp;Day"],
    ["11/11","Remembrance&nbsp;Day"],
    ["12/25","Christmas&nbsp;Day"],
    ["12/26","Boxing&nbsp;Day"],
]
);

let schedule = ["4/6/2024",
                "5/6/2024/8","5/6/2024/10","5/6/2024/13",
                "5/10/2024",
                "6/12/2024",
                "6/2/2024/11","6/2/2024/9",
                "6/6/2024/13"]

let today = new Date();
let thisDate = today.getDate();
let thisMonth = today.getMonth();
let thisYear = today.getFullYear();
let thisDay = today.getDay();

makeCalender(thisMonth,thisYear);
makeTimeTable(today);

for (let k = 0; k < serItems.length; k++) {
    serItems[k].onclick = function() {
    if(servChecked != k) {
    servDetail[1].innerHTML = serItems[k].id;
    servDetail[5].innerHTML = "$"+serItems[k].value;
    servChecked = k;
    if((dateChecked >= 0) || (timeChecked > 0)) {
    resetDate();
    resetTime();
    }
    }
    }
}

incMonth[0].onclick = function() {

    findCurrentDate();

    if(curMonthN != 11) {
        curMonthN++;
    } else 
    {
        curMonthN = 0;
        curYearN++;
    }
    
    calul.innerHTML = "";

    makeCalender(curMonthN,curYearN);
    
}

decMonth[0].onclick = function() {

    findCurrentDate();

    if((curYearN > thisYear) || ((curYearN == thisYear) && (curMonthN > thisMonth))) {
    if(curMonthN != 0) {
        curMonthN--;
    } else 
    {
        curMonthN = 11;
        curYearN--;
    }
    
    calul.innerHTML = "";

    makeCalender(curMonthN,curYearN);
    }
}

function hookuptime(){
    let timelist = document.querySelectorAll(".timetable li");
    for (let j = 0; j < timelist.length; j++) {

    timelist[j].onclick = function(){

        let actTime = document.querySelectorAll(".timetable li.active");

        if(timelist[j].className !== "inactive") {

        if (dateChecked == 0){
            alert("Please choose a date first!");
        }
        else{
        if ((actTime.length < 1)) {
            timelist[j].classList.toggle("active");
    } else {
            actTime[0].classList.toggle("active");
            timelist[j].classList.toggle("active");
    }

    timeChecked = 1;

    timeMsg = timelist[j].innerHTML;

    servDetail[3].innerHTML = timeMsg;

    }
}
};
}
}

function findDays(txtString) {
    const regExp = /\d+/;
    return parseInt(txtString.match(regExp));
}

function findCurrentDate(){
    currMonth = monthLable.innerHTML;
    currYear = yearLable.innerHTML;
    
    curYearN = parseInt(currYear);
    curMonthN = months.indexOf(currMonth);
}

function makeCalender(theMonth,theYear){
    let curday = new Date(theYear,theMonth,1);
    let day1stMonth = curday.getDay();

for (let di = 1; di <= day1stMonth; di++){
    calul.innerHTML += "<li><span class=\"inactive\">&nbsp;</span></li>";
}

if  ((theMonth == 1) && ((theYear & 3) == 0 && ((theYear % 25) != 0 || (theYear & 15) == 0)))
{
    dayofMonth = daysInMonth[theMonth] +1;
} else
{
    dayofMonth = daysInMonth[theMonth];
}

for (let dj = 1; dj <= dayofMonth; dj++){
if ((( theMonth == thisMonth ) && (dj < thisDate) && (theYear == thisYear))||(schedule.indexOf((theMonth+1) + '/' + dj + '/' + theYear) > -1) ){
    calul.innerHTML += "<li><span class=\"inactive\">" + dj + "</span></li>";
} else {

if ((dateChecked == 1) && (selectedDay.getDate() == dj) && (selectedDay.getMonth() == theMonth) && (selectedDay.getFullYear() == theYear)){
    calul.innerHTML += "<li><span class=\"active\">" + dj + "</span></li>";
} else {
    if(holiday.has((theMonth+1) + '/' + dj)){
    calul.innerHTML += "<li><span class=\"holiday\" title=" + holiday.get((theMonth+1) + '/' + dj) + ">" + dj + "</span></li>";
    } else {
    calul.innerHTML += "<li><span>" + dj + "</span></li>";
}
}
}
}

for (let dk = 1; dk <= 42 - (daysInMonth[thisMonth]+day1stMonth); dk++){
    calul.innerHTML += "<li><span class=\"inactive\">&nbsp;</span></li>";
} 

monthLable.innerHTML = months[theMonth];
yearLable.innerHTML = theYear;

hookupDays();

}

function hookupDays(){

    calenderDays = document.querySelectorAll(".days li span");
    calDays = document.querySelectorAll(".days li");
    
    findCurrentDate();
    
    for (let i = 0; i < calenderDays.length; i++) {
        
        if((calenderDays[i].className !== "inactive") && (calenderDays[i].className !== "holiday")){
        calDays[i].onmouseover = function () {
            calDays[i].style.backgroundColor = 'lightyellow';
        }
        calDays[i].onmouseout = function () {
            calDays[i].style.backgroundColor = '#eee';
        } 
    } 
    
        calenderDays[i].onclick = function(){
    
            let actDay = document.querySelectorAll(".days li span.active");
    
            if((calenderDays[i].className !== "inactive") && (calenderDays[i].className !== "holiday")){
    
            if (servChecked >= 0) {
            if ((actDay.length < 1)) {
                calenderDays[i].classList.toggle("active");
        } else {
                actDay[0].classList.toggle("active");
                calenderDays[i].classList.toggle("active");
        }
    
        let dateTxt = calenderDays[i].innerHTML;
    
        let selday = new Date(curYearN, curMonthN, findDays(dateTxt));
    
        dateMsg = weeks[selday.getDay()] + ", " + months[curMonthN] + " " + findDays(dateTxt) + ", " + curYearN;
    
        servDetail[2].innerHTML = dateMsg;
        document.getElementById("date-content").innerHTML = dateMsg; 
        dateChecked = 1;
        selectedDay =selday;
        resetTime();
        makeTimeTable(selectedDay);

    } else {
        alert("Please choose a service first!");
    }
        }
    }
    }
    }
    
    function resetDate(){
        dateChecked = 0;
        servDetail[2].innerHTML = "Choose Date.";
        document.getElementById("date-content").innerHTML = "Please choose a date first.";

        calul.innerHTML = "";
        makeCalender(curMonthN,curYearN);
    }

    function resetTime(){
        servDetail[3].innerHTML = "Choose time.";

        let actTime = document.querySelectorAll(".timetable li.active");
        if(actTime.length >= 1) {
            actTime[0].classList.toggle("active");
        }
        timeChecked = 0;
    }
    
    function makeTimeTable(datetime){

        let timetblele = document.querySelector('.timetable');

        timetblele.innerHTML = "";

    if((datetime.getDay() == 0) || (datetime.getDay() == 6) ){
        for(let j = 9; j <= 14; j++){
            timetblele.innerHTML += "<li"+(schedule.indexOf((datetime.getMonth()+1)+'/'+datetime.getDate()+'/'+datetime.getFullYear()+'/'+j) > -1 ? " class=\"inactive\"" : "")+">" + (j<=12 ? j : j-12)+":00 " + ((j<12 ? "am" : "pm")) + "</li>";
        }
    } else {
        for(let i = 8; i <= 17; i++){
            timetblele.innerHTML += "<li"+(schedule.indexOf((datetime.getMonth()+1)+'/'+datetime.getDate()+'/'+datetime.getFullYear()+'/'+i) > -1 ? " class=\"inactive\"" : "")+">" + (i<=12 ? i : i-12)+":00 " + ((i<12 ? "am" : "pm")) + "</li>";
        }
    }
hookuptime();
    }

function savelocalinfo(){
if((servChecked != -1)&&(dateChecked != 0)&&(timeChecked != 0)){
    localStorage.setItem('serviceID', servDetail[0].innerHTML);
    localStorage.setItem('aptService', servDetail[1].innerHTML);
    localStorage.setItem('aptDate', servDetail[2].innerHTML);
    localStorage.setItem('aptTime', servDetail[3].innerHTML);
    localStorage.setItem('aptPrice', servDetail[5].innerHTML);
    return true;
} else {
    alert("Please finish making the appointment!")
    return false;
}

}