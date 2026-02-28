// ==========================================

/*
  The formula I use is not the scientifically best formula.
  If you want more correct result use Kepler's laws.
  Also I use center of circumcircle of ellipse because
  orbit of the earth is not too much ellipse, it's almost a circle
  and Sun is almost in the middle of the circle, you can use center of ellipse
*/

const earth = document.getElementById("earth");
const dateButton = document.getElementById("date");
const datePicker = document.getElementById("datePicker");
const ellipse = document.getElementById("ellipse");
const dateDisplay = dateButton.querySelector('.date-display');

let isPressing = false;

const earthSize = 15;
const horizontalRadius = 150;
const verticalRadius = 73;
const horizontalMargin = 25;
const verticalMargin = 10;

let today = new Date();
let year = today.getFullYear();
let start = new Date(today.getFullYear(), 0, 0);
let diff = today - start;
const oneDay = 1000 * 60 * 60 * 24;
let dayNumber = Math.floor(diff / oneDay);
let date = dateFromDay(dayNumber);
dateDisplay.textContent = addZero(date.getDate()) + "/" + addZero(date.getMonth()+1) + "/" + date.getFullYear();

let angle = 2*Math.asin(((dayNumber-1)/(182.5 + (isLeapyear()?0.5:0)))-1);
let x = horizontalRadius*Math.cos(angle);
let y = verticalRadius*Math.sin(angle);

// The ellipse is centered at cx=175, cy=83 in the SVG
// Earth should be positioned relative to the ellipse center
const earthX = 175 + x - earthSize/2;
const earthY = 83 - y - earthSize/2;

earth.setAttribute("x", earthX);
earth.setAttribute("y", earthY);

earth.addEventListener("mousedown", mousedown);
earth.addEventListener("touchstart", mousedown);

addEventListener("mousemove", mousemove);
addEventListener("touchmove", mousemove);

addEventListener("mouseup", mouseup);
addEventListener("touchend", mouseup);

const dateButtonRect = dateButton.getBoundingClientRect();
datePicker.style.top = dateButtonRect.height + "px";
datePicker.style.right = 0;
dateButton.style.height = dateButtonRect.height + "px";

function mousedown(e) {
    isPressing = true;
    e.preventDefault();
}

function mousemove(e) {
    if(!isPressing) return;

    const { clientX, clientY } = e.touches != null ? e.touches[0] : e;

    const rect = ellipse.getBoundingClientRect();
    // Get the center of the ellipse in screen coordinates
    const ellipseCenterX = rect.left + rect.width/2;
    const ellipseCenterY = rect.top + rect.height/2;

    // Calculate angle from user's mouse to the ellipse center
    angle = Math.atan2(ellipseCenterY - clientY, clientX - ellipseCenterX);

    let x = horizontalRadius*Math.cos(angle);
    let y = verticalRadius*Math.sin(angle);

    // Position earth relative to ellipse center (175, 83 in SVG coordinates)
    const earthX = 175 + x - earthSize/2;
    const earthY = 83 - y - earthSize/2;

    earth.setAttribute("x", earthX);
    earth.setAttribute("y", earthY);

    let oldDate = date;

    let dayNumber = ((182.5 + (isLeapyear()?0.5:0))*(Math.sin((angle)/2) + 1) + 1);

    date = dateFromDay(dayNumber);

    if(oldDate.getDate() == 1 && oldDate.getMonth() == 0 && date.getDate() == 31 && date.getMonth() == 11){
        year--;
    }else if(oldDate.getDate() == 31 && oldDate.getMonth() == 11 && date.getDate() == 1 && date.getMonth() == 0){
        year++;
    }

    dayNumber = ((182.5 + (isLeapyear()?0.5:0))*(Math.sin((angle)/2)+1)+1);
    date = dateFromDay(dayNumber);

    // Always show the date normally, including future dates
    dateDisplay.textContent = addZero(date.getDate()) + "/" + addZero(date.getMonth() + 1) + "/" + date.getFullYear();
}

function dateFromDay(day){
    let d = new Date(year, 0);
    return new Date(d.setDate(day));
}

function mouseup(e) {
    isPressing = false;
}

function addZero(num){
    return num<10?"0"+num:num;
}

function isLeapyear(){
    return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
}

// Close date picker when clicking outside
document.addEventListener('click', (e) => {
    if (!dateButton.contains(e.target) && !ouijaModal.classList.contains('active')) {
        dateButton.querySelector('input[type="checkbox"]').checked = false;
    }
